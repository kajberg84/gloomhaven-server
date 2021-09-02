/**
 * Module for the Heroes Controller.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import HeroesModel from "../models/heroesModel.js";
 import createError from "http-errors";
 
 /**
  * Encapsulates a controller.
  */
 export class HeroesController {
  // Transforming incoming data
  transformData(hero) {
    return {
      id: hero._id,
      name: hero.name,
      heroClass: hero.heroClass,
      level: hero.level,
      retirement: hero.retirement
    };
  }
   /**
   * If url has a param.
   * Get a hero and save as req.hero
   *
   * @param {object} req - Express request object.
   * @param {object} res - Express response object.
   * @param {Function} next - Express next middleware function.
   */
    async loadHero(req, res, next, id) {
      try {
        const hero = await HeroesModel.findOne({ _id: id });
        if (!hero) {
          next(createError(404));
          return;
        }
        req.hero = hero;
        next();
      } catch (error) {
        next(error);
      }
    }
 
   /**
    * Create a new hero.
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
   async create(req, res, next) {
     const { name, heroClass, level, retirement  } = req.body;
     const { userId } = req.user 
     const newHero = new HeroesModel({
      userId: userId,
      name: name,
      heroClass: heroClass,
      level: level,
      retirement: retirement
     });
 
     try {
       // Saving user in DB
       await newHero.save();
       res.status(201).json(this.transformData(newHero));
     } catch (error) {
       console.log("Error creating hero", error.message);
       error.status = 409;
       error.message = "Error creating hero";
       next(error);
     }
   }
  
   /**
    * Get a user by id.
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
   async getById(req, res, next) {
     console.log('req hero', this.transformData(req.hero))
     try {
       res.status(200).json(this.transformData(req.hero));
     } catch (error) {
       error.status = 404;
       error.message = "No Users to show";
       next(error);
     }
   }
 
   /**
    * Get all heroes
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
   async getAllheroes(req, res, next) {
     try {
      const { userId } = req.user 
       const heroes = await HeroesModel.find({userId: userId })
       res.status(200).json(heroes);
     } catch (error) {
       error.status = 404;
       error.message = "No heroes to show";
       next(error);
     }
   }
 
   /**
    * Delete a user and its Events/todos.
    *
    * @param {object} req - Express request object.
    * @param {object} res - Express response object.
    * @param {Function} next - Express next middleware function.
    */
   async delete(req, res, next) {
     const { _id } = req.hero;
     try {
       await HeroesModel.deleteOne({ _id: _id });
       console.log("hero deleted");
       res.status(204).json("hero deleted");
     } catch (error) {
       error.status = 404;
       error.message = "No Hero to delete or error deleting Hero";
       next(error);
     }
   }
 }
 