/**
 * Module for the rep Controller.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

import RepModel from "../models/repModel.js";

/**
 * Encapsulates a controller.
 */
export class RepController {
  /**
   * Get replist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async get(req, res, next) {
    try {
      const repList = await RepModel.find({
        userId: req.user.userId,
      });
      console.log("REPLIST", repList[0].repNumber);
      res.status(200).json(repList[0].repNumber);
    } catch (error) {
      error.status = 404;
      error.message = "Some error at getting reputation list.";
      next(error);
    }
  }

  /**
   * Post replist.
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
  async create(req, res, next) {
    const { repListNumber } = req.body;
    const { userId } = req.user;
    const filter = { userId: userId };
    const update = { repNumber: repListNumber };
    // new: true = if empty creating new, upsert = returns updated
    const options = { new: true, upsert: true };
    try {
      // Saving replist in DB
      let updatedList = await RepModel.findOneAndUpdate(filter, update,options);
      res.status(201).json(updatedList.repNumber);
    } catch (error) {
      console.log("Error in creating/updating replist", error.message);
      error.status = 409;
      error.message = "Error creating/updating replist";
      next(error);
    }
  }
}
