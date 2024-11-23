const express = require("express");

const routes = require("./routes");
const cors = require('./app/middlewares/cors')
require('dotenv').config();

const app = express()

app.use(express.json());
app.use(cors);  

app.use(routes);
app.listen(3001, () => console.log("Server started ar http://localhost:3001"));
