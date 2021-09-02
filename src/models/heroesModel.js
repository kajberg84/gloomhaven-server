// heroesModel.js

import mongoose  from "mongoose";

const heroesSchema = mongoose.Schema({
  userId: { type: String, required: true},
  name: {type: String, required: true, trim: true},
  heroClass: {type: String, required: true, trim: true},
  level: {type: Number, required: true},
  retirement: {type: Boolean }
})

const HeroesModel = mongoose.model('HeroesModel', heroesSchema)

export default HeroesModel