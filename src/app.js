const express = require("express");
const db = require("../db/conn.js");
const path = require("path");
const app = express();
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const { ENGINE_METHOD_ALL } = require("constants");
const hbs = require("hbs");


// Require the driver.ujsavdvfdas
var pg = require('pg');

var connectionString = process.env.DATABASE_URL || 'postgresql://adarsha:@MLHpassword123@free-tier5.gcp-europe-west1.cockroachlabs.cloud:26257/basic-mink-643.defaultdb?sslmode=disable';
var client = new pg.Client(connectionString);


// setting the path
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");
app.use('/bootstrap.css', express.static(path.join(__dirname, '../node_modules/bootstrap/dist/css/bootstrap.css')))
//middleware

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path)
// routing

app.get("/",(req,res) => {
    res.render("index");
  })
  app.get("/getstarted",(req,res) => {
    res.render("getstarted");
  })
  app.get("/add-targets",(req,res) => {
    res.render("add-targets");
  })
  app.get("/our-checklists",(req,res) => {
    res.render("our-checklists");
  })
  app.get("/github",(req,res) => {
    res.render("github");
  })
  app.get("/signup",(req,res) => {
    res.render("signup");
  })


//app.get(path, callback)
app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
)

//database apis

app.get('/api/view', db.view) 
app.post('/api/create', db.create)
app.post('/api/sendsms', db.sendsms)
app.post('/api/signup', db.signup)

//server create
app.listen(port, () => {
    console.log(`Server is running at port number ${port}`);
})
