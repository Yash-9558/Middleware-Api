const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const doc = require('./db/conn');
const port = 8000;
const json_to_xml = require('./json_to_xml');
const xml_to_json = require('./xml_to_json');
const { ApolloServer } = require('apollo-server-express');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.text({ type: 'application/xml' }));

app.get('/', (req, res) => {
      res.send('Welcome to data format converter')
})
app.get('/XML', async (req, res) => {
      const data = await doc.find({});
      res.send(json_to_xml(data));
})
app.get('/JSON', async (req, res) => {
      const data = await doc.find({});
      res.send(data);
})
app.get('/XML/:Product_ID', async (req, res) => {
      const data = await doc.findOne({ "Product_ID": req.params.Product_ID });
      console.log(data);
      res.send(json_to_xml(data));
})
app.get('/JSON/:Product_ID', async (req, res) => {
      const data = await doc.findOne({ "Product_ID": req.params.Product_ID });
      res.send(data);
})
app.post('/XML', async (req, res) => {
      const data = xml_to_json(req.body);
      if ("item" in data) {
            const arrOfObj = data["item"];
            const promises = arrOfObj.map(async (element) => {
            const check = await doc.findOne({ Product_ID: element.Product_ID });
            if (check) {
                  return `Data of ${element.Product_ID} is already present in our database...\n`;
            } else {
                  const addProduct = new doc(element);
                  await addProduct.save();
                  return "";
            }
            });
            
            const arr = await Promise.all(promises);
            const fnl = arr.join("");
            if(fnl == "") res.send('Data added successfully!!');
            else res.send(fnl);
      }
      else {
            const check = await doc.findOne({ Product_ID: data.Product_ID });
            if (check) {
                  res.send("Data of this Product is already present in our database...");
            } else {
                  const addProduct = new doc(data);
                  await addProduct.save();
                  res.send("Data added successfully!!");
            }
      }
})
app.post('/JSON', async (req, res) => {
      const data = req.body;
      if (Array.isArray(data)) {
            const promises = data.map(async (element) => {
            const check = await doc.findOne({ Product_ID: element.Product_ID });
            if (check) {
                  return `Data of ${element.Product_ID} is already present in our database...\n`;
            } else {
                  const addProduct = new doc(element);
                  await addProduct.save();
                  return ""; // Return an empty string for elements that were added to the database
            }
            });
            
            const arr = await Promise.all(promises);
            const fnl = arr.join("");
            if(fnl == "") res.send('Data added successfully!!');
            else res.send(fnl);
      }
      else {
            const check = await doc.findOne({ Product_ID: data.Product_ID });
            if (check) {
                  res.send("Data of this Product is already present in our database...");
            } else {
                  const addProduct = new doc(data);
                  await addProduct.save();
                  res.send("Data added successfully!!");
            }
      }
})

app.listen(port, () => {
      console.log(`server running on ${port}`);
})

const typeDefs = require('./graph_ql/typedefs');
const resolvers = require('./graph_ql/resolvers');
const startApolloServer = async () => {
      const server = new ApolloServer({ typeDefs, resolvers });

      // Step 1: Start the Apollo Server
      await server.start();

      // Step 2: Apply the Apollo middleware to the Express app
      server.applyMiddleware({ app });

      // Additional express app configurations or middleware can be added here

      // Step 3: Start your Express server
      const PORT = 4000;
      app.listen(PORT, () => {
      console.log(`apollo-server running on port ${PORT}`);
      });
}
    
startApolloServer().catch((err) => {
console.error('Error starting the server:', err);
});