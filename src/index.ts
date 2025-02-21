import express from "express";
import cors from "cors";
import integrationRouter from "./routes/integration";
import tickRouter from "./routes/tick";
import middleware from "./utils/middleware";
import "dotenv/config";

export const app = express();

app.use(cors());
app.use(express.json());

app.use("/", integrationRouter);
app.use("/", tickRouter);

app.use(middleware.unknownEndpoint);

const PORT = process.env.PORT || 3000;

export const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
