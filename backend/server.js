import express from "express";
import cors from "cors";
import connectDB from "./databases/DB.js";
import AdminRouter from "./routers/AdminLoginRoutes.js";
import blogRouter from "./routers/BlogRoutes.js";
import commentRouter from "./routers/Commentroutes.js";
const app = express();

//Database
await connectDB();

//Middlewares
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("<h1>The server is running successfully. </h1>");
});

//Api Endpoints

app.use("/api/admin", AdminRouter);
app.use("/api/blog", blogRouter);
app.use("/api/comments", commentRouter);

app.listen(4000, (req, res) => {
  console.log("The server is running on port:4000");
});
