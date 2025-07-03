import mongoose, { Schema } from "mongoose";

const userSchemas =new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true,
        trim:true,
    },
    password:{
        type: String,
        required: true,
        trim:true,
    }
},
  {
  timestamps: true
}
)

export const user= mongoose.model('user',userSchemas)