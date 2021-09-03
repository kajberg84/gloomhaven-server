/**
 * Rep Router.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import express from 'express'
 import { RepController } from '../controllers/rep-controller.js'
 import { authAccessToken, hasPermission } from '../utilities/jwthandler.js'
 
 export const repRouter = express.Router()
 const controller = new RepController()
 
 const PermissionLevels = Object.freeze({
   CHILD: 1,
   GUEST: 2,
   OWNER: 4,
   ADMIN: 8
 })
 
 // Get rep
 repRouter.get('/', 
 authAccessToken,
   (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
   (req, res, next) => controller.get(req, res, next)
 )
 
 // Post rep
 repRouter.post('/', 
 authAccessToken,
   (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
   (req, res, next) => controller.create(req, res, next)
 )
