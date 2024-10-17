import express from "express";
import userRoutes from "./routes/user.routes";

const app = express()

app.use(express.json())

app.use("/users", userRoutes);

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});