const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const route = require("./routes/route");
const app = express();

app.use(express.json());

app.use("/", route);

app.listen(process.env.APP_PORT, () => {
  console.log(`Server is running on port ${process.env.APP_PORT}`);
});
