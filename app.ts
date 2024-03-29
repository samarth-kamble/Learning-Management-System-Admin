import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
require("dotenv").config();
import { ErrorMiddleware } from "./middleware/error";
import UserRouter from "./routes/user.route";

export const app = express();
// body-parser: Parse incoming request bodies in a middleware before your handlers, available under the req.body property.

app.use(express.json({ limit: "50mb" }));

// cookie parsor: Parse Cookie header and populate req.cookies with an object keyed by the cookie names.
app.use(cookieParser());

// cors: Cross-Origin Resource Sharing

app.use(cors({ origin: process.env.ORIGIN }));

// routes
app.use("/api/v1", UserRouter);

// testing api
app.get("/test", (req: Request, res: Response, next: NextFunction) => {
  res.status(200).json({
    success: true,
    message: "API is running",
  });
});

// Error Handling
app.all("*", (req: Request, res: Response, next: NextFunction) => {
  const err = new Error(`Can't find ${req.originalUrl} on this server!`) as any;
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);
