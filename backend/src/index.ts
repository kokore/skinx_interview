import express from "express";

import userRouter from "./routes/user";
import postRouter from "./routes/post";
import tagRouter from "./routes/tag";

const app = express();

const API_V1 = "/api/v1";

app.use(express.json());

app.use(`${API_V1}`, userRouter);
app.use(`${API_V1}`, postRouter);
app.use(`${API_V1}`, tagRouter);

app.listen(`${process.env.PORT}`, () =>
  console.log(`
🚀 Server ready at: http://localhost:${process.env.PORT}`)
);
