const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");  

dotenv.config();

const {
    DB_USER,
    DB_PASSWORD,
    DB_HOST,
    DB_PORT,
    DB_NAME,
} = process.env;

const MONGO_URI = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`

mongoose
.connect(MONGO_URI,{useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {console.log("MongoDB is connected")})
.catch((err) => {console.log(err)});

app.use(express.json());
app.use(cors());

app.use("/user", require("./routers/user.js"))

app.listen(5000, () => {console.log("Server is runnung on port 5000")});