import express from "express";
import cors from "cors";
import { config } from "./config";
import routes from "./routes";

const app = express();

// CORS configuration to allow both frontend and expo-admin
const allowedOrigins = config.allowedOrigins
  ? config.allowedOrigins.split(",")
  : [config.frontendUrl];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());

app.use("/api", routes);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

const PORT = Number(config.port);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`Allowed origins: ${allowedOrigins.join(", ")}`);
});
