import express from "express";
import "dotenv/config";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.get("/", (req, res) => res.send("API working"));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on PORT: ${PORT}`);
});

export default app;
