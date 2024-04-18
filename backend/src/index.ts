// configure env in the entire application
import dotenv from "dotenv";
dotenv.config();

// import packages
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import fileUpload from "express-fileupload";

// import config
import { connectDB } from "@/config/db.config";

// middleware imports
import { errorHandler, notFound } from "@/middleware/error.middleware";

// route imports
import userRoutes from "@/routes/user.route";
import authRoutes from "@/routes/auth.route";
import propertyRoutes from "@/routes/property.route";
import bookingRoutes from "@/routes/booking.route";

const initializeServer = async () => {
  // initialise app
  const app = express();

  // connect mongoDB
  await connectDB();

  // apply middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());
  app.use(cookieParser());
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
      createParentPath: true,
    })
  );

  // routes
  app.use("/api/users", userRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/properties", propertyRoutes);
  app.use("/api/bookings", bookingRoutes);

  // Error middleware
  app.use(notFound);
  app.use(errorHandler);

  // connect to mongoDB and listen to app
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
};

initializeServer();
