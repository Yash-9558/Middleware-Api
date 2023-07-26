const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 8000;
const doc = require('./db/conn');
app.use(express.json());
app.use(bodyParser.text({ type: 'application/xml' }));

//for every request first execute middleware
// app.use((req,res,next)=>{
//       console.log('Hello from middleware');
//       next();
// })

// const checkIfPedro = (req,res,next) =>{
//       const name = req.body.name;
//       // console.log(req.body);
//       if(name === "Pedro"){
//             res.json({"error":"Not allowed"});
//       }
//       else{
//             next();
//       }
// }

app.get('/',(req,res)=>{
      // if(typeof(req.body) === "object"){
      //       const builder = new XMLBuilder();
      //       const xml = builder.build(req.body);
      //       res.send(xml);
      // }
      // else if(typeof(req.body) === "string"){
      //       const parser = new XMLParser();                
      //       const jsonData = parser.parse(req.body);
      //       res.send(jsonData);
      // }
      doc.find({},{_id:0}).exec().then(docs => {
            const obj= {middleware_data:docs}
            // console.log(obj);
            // const options = {
            //       compact: true,
            //       ignoreComment: true,
            //       spaces: 4
            // };
            // const xml = json2xml(obj, options);
            // console.log(xml)
            // const xml = json2xml(obj, {
            //       prettyPrint: true
            // });
                
            // console.log(xml);
            res.send(obj);
      }).catch(err => {
            console.error(err);
      });
})


app.post('/',(req,res)=>{
      // console.log(req.headers['content-type']);
      const newDocument = new doc(req.body);
      newDocument.save().then((result) => {
            console.log('Document inserted successfully:', result);
      }).catch((error) => {
            console.error('Error inserting document:', error);
      });
      res.send('You are good to go');
})

// app.get('/:name',(req,res)=>{
//       // console.log(req.params.name);
//       // res.json({'json':'format'});
//       res.send('hello '+ req.params.name);
// })

// app.post('/',checkIfPedro,(req,res)=>{
//       res.send('You logged in');
// })

app.listen(port,()=>{
      console.log(`server running on ${port}`);
})