import express from "express";
import cors from "cors";
import router from "./routes/index.mjs";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(express.json());

app.use("/api/v1/", router);

const port = process.env.PORT || 3002;
console.log("ENV PORT:", process.env.PORT);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});
