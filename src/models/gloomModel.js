// gloomModel.js

import mongoose  from "mongoose";

const gloomSchema = mongoose.Schema({
  userId: { type: String, required: true},
  glooms: Array,
})

const GloomModel = mongoose.model('GloomModel', gloomSchema)

export default GloomModel