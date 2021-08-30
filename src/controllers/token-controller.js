/**
 * Module for the Token Controller.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import jwt from 'jsonwebtoken'

 /**
  * Encapsulates a controller.
  */
 export class TokenController {
 
 /**
 * Returning token and user.
 *
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {Function} next - Express next middleware function.
 */
 async refreshToken (req, res, next) {
   console.log("______________",req.user)
 try {
     const payload = { ...req.user };

// Creating accessToken/ refreshconfig
const accConfig = {
  secret: process.env.ACCESS_TOKEN_SECRET,
  life: process.env.ACCESS_TOKEN_LIFE,
  payload: payload
};
const refConfig = {
  secret: process.env.REFRESH_TOKEN_SECRET,
  life: process.env.REFRESH_TOKEN_LIFE,
  payload: payload
};
// creating tokens
const accessToken = createToken(accConfig);
const refreshToken = createToken(refConfig);

await saveRefToken(user._id, refreshToken);

     res.status(200).json({
       access_token: accessToken,
       refresh_token: refreshToken,
     });
   } catch (error) {
   console.log('error i refreshtoken', error.message)
   next(createError(403, "error refreshToken"))
 }
 }
 }
 