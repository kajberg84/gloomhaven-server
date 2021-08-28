/**
 * Gloom Router.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import express from 'express'
 import { GloomController } from '../controllers/gloom-controller.js'
 import { authAccessToken, hasPermission } from '../utilities/jwthandler.js'
 
 export const gloomRouter = express.Router()
 const controller = new GloomController()
 
 const PermissionLevels = Object.freeze({
   CHILD: 1,
   GUEST: 2,
   OWNER: 4,
   ADMIN: 8
 })
 
 // Get todo
 gloomRouter.get('/', 
 authAccessToken,
   (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
   (req, res, next) => controller.get(req, res, next)
 )
 
 // Post todo
 gloomRouter.post('/', 
 authAccessToken,
   (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
   (req, res, next) => controller.create(req, res, next)
 )
