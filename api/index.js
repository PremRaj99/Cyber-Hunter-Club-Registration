import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// define all routes
import userRoutes from "./routes/user.route.js";
import verifyRoutes from "./routes/verify.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDb is connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(
  cors({
    origin: "https://cyber-hunter-club-registration.vercel.app", // allow specific origin
    methods: ["GET", "POST", "PUT", "DELETE"], // allowed HTTP methods
    credentials: true, // if your API requires cookies or HTTP authentication
  })
);

// all api routers
app.use("/api", userRoutes);
app.use("/api/verify", verifyRoutes);

app.listen(port, () => {
  console.log("Server is running on :", port);
});
