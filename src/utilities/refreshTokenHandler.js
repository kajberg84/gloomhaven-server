// jwtHandler.js

import jwt from 'jsonwebtoken'
import jwtDecode from "jwt-decode";
import createError from "http-errors";
import UserModel from "../models/userModel.js";
import { createToken } from "./jwtHandler.js";
/**
 * Refresh accestoken
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
export const authRefreshToken = async (userid2) => {
  console.log('_i autreftoken rad16 userid', userid2)
  try {
    console.log("___i autreftoken rad18 ref try")
    const refMongo = await UserModel.findOne({ _id: userid2 });
    if (!refMongo) {
      console.log("no user/reftoken exist");
      throw createError(409);
    }
    console.log("___autreftoken 24, refmongo",refMongo)
    // getting token from Mongo Db
    const { refToken } = refMongo;
    console.log("___autreftoken 27, reftoken", refToken)

    const refTokenResult = jwt.verify(
      refToken,
      process.env.REFRESH_TOKEN_SECRET
    );
      console.log("___autreftoken 33,reftokenResult",refTokenResult);
    //If not ref token
    if (!refTokenResult) {
      console.log("error i authRefresh, refToken");
      throw createError(403);
    }

    // Creating payload for jwt
    const payload = {
      userId: refMongo._id,
      email: refMongo.email,
      permissionLevel: refMongo.permissionLevel,
    };

    const refConfig = {
      secret: process.env.REFRESH_TOKEN_SECRET,
      life: process.env.REFRESH_TOKEN_LIFE,
      payload: payload,
    };

    // creating tokens
    // const accessToken = createToken(accConfig);
    const refreshToken = createToken(refConfig);
 console.log("rad 60 i authresfresh token före save", refreshToken);
    //refreshToken uppdateras
    saveRefToken(refMongo._id, refreshToken)
    console.log("rad 60 i authresfresh token efter save");

    // const decodeResult = jwtDecode(accessToken);
    // const { userId:newId, email, permissionLevel } = decodeResult;

    return payload;
  } catch (error) {
    console.log("Error in authreftoken");
    throw createError(409, "error i authRefToken");
  }
};


/**
 * MongoDb update one.
 *
 * @param {*} filter - Parameters to filter by.
 * @param {*} update - What dokument to update.
 * @return {*} 
 */
export const saveRefToken = async (userId, refreshToken ) => {
  const filter = { _id: userId}
  const update = { refToken: refreshToken }
  const options = { new: true, upsert: true}
  try {
    console.log("updating & saving reftoken");
    await UserModel.findOneAndUpdate(filter, update, options);
    return
  } catch (error) {
    console.log('_i autreftoken', userId)
    console.log("error i saveRefToken");
    throw createError(403);
  }
};

