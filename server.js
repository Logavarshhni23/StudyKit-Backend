require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const productsRouter = require("./routes/products")
const cartRouter = require("./routes/cart")
const ordersRouter = require("./routes/orders")
const createDB = require("./config/db")
const authRouter = require("./routes/auth");

createDB();

app.use("/products",productsRouter);
app.use("/cart",cartRouter);
app.use("/orders", ordersRouter);
app.use("/auth", authRouter);

app.listen(3000,()=>{
    console.log("Server running on port 3000...");
});