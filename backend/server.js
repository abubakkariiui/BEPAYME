import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import path from "path";
import agentRoutes from "./routes/agentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import employeRoutes from "./routes/employeRoutes.js";
import historyRoutes from "./routes/historyRoutes.js";
import payRequest from "./routes/payRequest.js";
import accountantRoutes from "./routes/accountantRoutes.js";
import franchiseRoutes from "./routes/franchiseRoutes.js";
import accountHandlerRoutes from "./routes/accountHandlerRoutes.js";
import csrRoutes from "./routes/csrRoutes.js";
import bankRoutes from "./routes/bankRoutes.js";
import csr from "./routes/csr.js";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express(); // main thing

app.use(express.json()); // to accept json data
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/agent", agentRoutes);
app.use("/api/bank", bankRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/employe", employeRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/csr", csr);
app.use("/api/payRequest", payRequest);
app.use("/api/franchise", franchiseRoutes);
app.use("/api/handler", accountHandlerRoutes);
app.use("/api/accountant", accountantRoutes);
app.use("/api/csrr", csrRoutes);

// --------------------------deployment------------------------------
const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/PayMeFE/build")));
 
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "PayMeFE", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
// --------------------------deployment------------------------------

// Error Handling middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}..`.yellow
      .bold
  )
);
