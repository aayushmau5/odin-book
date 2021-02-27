import express from "express";
import cors from "cors";
import * as dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());

app.get("/", (_, res, __) => {
  res.json({
    message: "Hello ,world",
  });
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
