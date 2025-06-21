import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import adminRouter from "./routes/adminRoutes.js";

const app = express();

await connectDB();
// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => res.send("API working"));
app.use("/api/admin", adminRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});

export default app;
