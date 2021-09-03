// repmodel.js

import mongoose  from "mongoose";

const repSchema = mongoose.Schema({
  userId: { type: String, required: true},
  repNumber: {type: String, required: true}
})

const RepModel = mongoose.model('RepModel', repSchema)

export default RepModel