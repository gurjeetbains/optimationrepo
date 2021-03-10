/**
 * Main File where routes are set
 * Added all the features so that framework is capable of supporting different types of requests
 */
const express = require("express")
const cors = require("cors");
const bodyParser = require('body-parser');
const app = express();
const tags = require('./routes/tags');
const path = require('path');
app.use(express.static(path.join(__dirname,'dist')));
app.use(cors());
app.set('view engine','html');
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json({
    extended: false
}))
app.use("/api", tags);
app.get('/',(req,res)=>{
    res.send('Server is Ready to extract Data');
});
app.get('/*',(req,res)=>{
    res.redirect('/');
});
app.listen(3000, () => console.log("Server runing on 3000"));