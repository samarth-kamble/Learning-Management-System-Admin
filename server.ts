import { app } from "./app";
import connectDB from "./utils/db";

require("dotenv").config();

// Creating a server

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
  connectDB();
});
