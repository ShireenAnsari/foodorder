import {model, models, Schema} from "mongoose";

const CategorySchema = new Schema({
  name: {type:String, required:true},
}, {timestamps: true});

export const Category = models?.Categorys || model('Categorys', CategorySchema);