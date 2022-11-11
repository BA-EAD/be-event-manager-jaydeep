import * as mongoose from "mongoose";

export const RoleSchema= new mongoose.Schema({
    id :{
        type:String,
        required:false
    },
    name :{
        type:String,
        required:true
    },
    type :{
        type:String,
        required:true
    },
    permission :{
        type:Array,
        required:true
    }
})


export interface UserRole extends mongoose.Document {
    _id?:string;
    name:string;
    type:number;
    permission:any;
    
}