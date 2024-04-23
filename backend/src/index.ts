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
import { logger } from "@/lib/logger";

const initializeServer = async () => {
  // initialise app
  const app = express();

  // connect mongoDB
  await connectDB();

  // apply middleware
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    cors({
      origin: process.env.FRONTEND_URL as string,
      credentials: true,
    })
  );
  app.use(helmet());
  app.use(cookieParser());
  if (process.env.NODE_ENV !== "production") {
    app.use(
      morgan("combined", {
        stream: {
          write: (message: string) => logger.log(logger.level, message),
        },
      })
    );
  }
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

  // catch-all route
  app.use("*", (req, res) => {
    res.redirect(process.env.DOCS_URL as string);
  });

  // Error middleware
  app.use(notFound);
  app.use(errorHandler);

  // connect to mongoDB and listen to app
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

initializeServer();
