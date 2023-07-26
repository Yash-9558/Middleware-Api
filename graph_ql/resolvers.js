const doc = require('../db/conn');
const json_to_xml = require('../json_to_xml')
module.exports =  {
      Query : {
          async getAllJSON(_,{}){
            return await doc.find();
          },
          async getAllXML(_,{}){
            return json_to_xml(await doc.find());
          },
          async getProductJSON(_,{Product_ID}){
              return await doc.findOne({Product_ID : Product_ID});
          },
          async getProductXML(_,{Product_ID}){
              const data = json_to_xml(await doc.findOne({Product_ID : Product_ID}));
              console.log(data);
              return data;
          }
      },
      Mutation : {
          async AddProduct(_, { details }) {
              const { Product_ID,Product_Name, MRP, Rating, Number_of_orders } = details;
            
              const new_product = new doc({
                Product_ID:Product_ID,
                Product_Name: Product_Name,
                MRP: MRP,
                Rating: Rating,
                Number_of_orders: Number_of_orders
              });
            
              const response = await new_product.save();
              return response;
            }
      }
  }