/**
 * Main Router.
 *
 * @author Kaj Berg
 * @version 0.1.0
 */
import express from "express";
import { homeRouter } from "./home-router.js";
import { userRouter } from "./user-router.js";
import { loginRouter } from "./login-router.js";
import { tokenRouter } from './token-router.js';
import { gloomRouter } from './gloom-router.js';
import { heroesRouter } from './heroes-router.js';


import createError from 'http-errors'

export const router = express.Router();

// User router
router.use('/users', userRouter);

// Login user
router.use('/login', loginRouter);

// Default router
router.use('/', homeRouter);

// Token router
router.use('/refresh', tokenRouter)

// Gloom router
router.use('/gloom', gloomRouter)

// Heroes router
router.use('/heroes', heroesRouter)

// Catch 404 as last route
router.use('*', (req, res, next) => next(createError(404)));
