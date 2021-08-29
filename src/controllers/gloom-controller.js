/**
 * Module for the gloom Controller.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import GloomModel from "../models/gloomModel.js";
 
 /**
   * Encapsulates a controller.
   */
   export class GloomController {
 
   /**
    * Get glooms. 
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
   async get (req, res, next) {
     try { 
       const gloomList = await GloomModel.find({
         userId: req.user.userId
     }) 
     const glooms = gloomList[0].glooms
       res.status(200).json(glooms)
     } catch (error) {
       error.status = 404
       error.message = 'This user has nothing in his gloomList.'
       next(error)
     }
 
     }
 
   /**
    * Post glooms.
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
    async create (req, res, next) {
      console.log("i post glooms", req.body);
      // Settings for search
      const { glooms } = req.body
      const { userId } = req.user
      const filter = {userId: userId}
      const update = {glooms: glooms}
      // new: true = if empty creating new, upsert = returns updated
      
      const options = { new: true, upsert: true}
    try {
        let updatedGlooms = await GloomModel.findOneAndUpdate(filter, update,options);
        res.status(201).json(updatedGlooms.glooms)
    } catch (error) {
        console.log(error)
        error.status = 404
        error.message = 'Glooms was not saved'
        next(error)
    }
    }
 }