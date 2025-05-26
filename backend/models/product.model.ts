import mongoose, {Document,Schema, Model} from 'mongoose'

export interface IProduct extends Document{
  name:string,
  price:number,
  image:string,
  description:string
}

const productSchema : Schema<IProduct>= new Schema({
    name:{
        type:String,
        required:true,
    },

    price:{
        type:Number  ,
        required:true,
    },

    image:{
        type:String,
        required:true,
    },

    description:{
      type:String,
      required:true,
    }
})

export const Product: Model<IProduct> = mongoose.model<IProduct>("Product",productSchema)

