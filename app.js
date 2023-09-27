const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');
const express = require('express');
const bodyparser = require('body-parser');
const fileupload = require('express-fileupload');

const app = express();
const Route = require('./routes/route');

mongoose.connect('mongodb+srv://dennismarko:markdennisiligannapil3182000@cluster0.foskgri.mongodb.net/?retryWrites=true&w=majority/shelf',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error!"));
db.once("open", function(){
    console.log("Connected successfully!");
});

app.use(cors());
app.use(fileupload());
app.use('/resources', express.static(__dirname + '/uploads'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));
app.use(Route);

const port = process.env.port || 4000;

http.createServer(app).listen(port, () => {
  console.log(`Server is running at port ${port}`);
});