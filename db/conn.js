const mongoose = require("mongoose");
//                                          database
mongoose.connect("mongodb://127.0.0.1:27017/Middleware",{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
      console.log('mongodb connected');
}).catch((error)=>{
      console.log(error);
})

const userSchema = mongoose.Schema({
      Product_ID:{
            type:Number,
            unique:true,
            required:true
      },
      Product_Name:{
          type: String,
          required : true
      },
      MRP:{
          type: Number,
          required : true,
      },
      Rating:{
          type : Number
      },
      Number_of_orders: {
          type : Number
      }
  })
//                         collection -> we insert document
const doc = mongoose.model("Product", userSchema);
module.exports = doc;