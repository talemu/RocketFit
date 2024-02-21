import express from "express";
import cors from "cors";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(7045, () => {
  console.log("Server started on post 7045");
});
