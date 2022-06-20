const express = require("express");
const resultRoute=require("./route");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

const cors = require("cors");

app.use(cors());

app.use(resultRoute);

app.listen(PORT, () => {
    console.log("Server is on port", PORT);
});