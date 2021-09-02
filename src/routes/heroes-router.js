/**
 * Heroes Router.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */

 import express from 'express'
 import { HeroesController } from '../controllers/heroes-controller.js'
 import { authAccessToken, hasPermission } from '../utilities/jwthandler.js'

export const heroesRouter = express.Router()

const controller = new HeroesController()
const PermissionLevels = Object.freeze({
  CHILD: 1,
  GUEST: 2,
  OWNER: 4,
  ADMIN: 8
})

// provide req.hero to the route if :id is present in the route path
heroesRouter.param('id', (req, res, next, id) => controller.loadHero(req, res, next, id))

// Get hero
heroesRouter.get('/', 
authAccessToken,
  (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
  (req, res, next) => controller.get(req, res, next)
)

// Create hero
heroesRouter.post('/', 
authAccessToken,
  (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
  (req, res, next) => controller.create(req, res, next)
)

// Get all heroes
heroesRouter.get('/all', 
authAccessToken,
  (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
  (req, res, next) => controller.getAllheroes(req, res, next)
)

// Delete hero 
heroesRouter.delete('/:id', 
  authAccessToken,
  (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
  (req, res, next) => controller.delete(req, res, next)
)

// Get hero by id
heroesRouter.get('/:id', 
authAccessToken,
  (req, res, next) => hasPermission(req, res, next, PermissionLevels.OWNER),
  (req, res, next) => controller.getById(req, res, next)
)



