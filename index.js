
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./Routes/route");

const app = express();

app.use(express.json());
app.use(cors())

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGODB_URL).then(() => {
    console.log("mongoDB is connected....");

    app.listen(PORT, () => {
        console.log(`Server is conneted to port: ${PORT}`)
    });
});


app.use("/api", routes);