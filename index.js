import express from "express"
import cors from "cors"
import product from "./model/Product.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const app = express();

import dns from "node:dns/promises";
dns.setServers(["1.1.1.1", "8.8.8.8"]);

app.use(express.json());

async function ConnectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("MongoDB connected");
  } catch(error) {
    console.error("MongoDB connection error:", error);
  }
}

ConnectDB()

app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  }),
);

let products = [
  {
    id: 1,
    name: "Corsair HS45",
    price: 4500,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8gWBYEsEc-BIBkLfkTItnNdjABTkmYTqibZh4E10XHg&s=10",
    desc: "A high Quality Gaming.",
  },
  {
    id: 2,
    name: "RTX 3060",
    price: 93000,
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSsI-f1pxbsXODAbY_lNzCKkmK_v9D-sVThyKq3GQTm_w&s=10",
    desc: "A powerfll Grahic Card from nvidia.",
  },
];

app.get("/products", async (req, res) => {
  try {
    const products = await product.find();
    res.json(products);
  }catch(error) {
    res.status(500).json({ massege: "Error fetching products"});
  }
});

app.post("/products", async (req, res) => {
  try{
    const newProductFields = req.body;
    const newProduct = new product(newProductFields);
    await newProduct.save();
   res.status(201).json(newProduct);
  }catch(error){
    res.status(500).json({massege: "Error creating product", error: error});
  }
});

app.delete("/products/:id", async (req, res) => {
  try{
    const { id } = req.params;
   await product.findOneAndDelete({id:id});
   res.status(204).send();
  } catch(error){
    res.status(500).json({massege: "Error deleting product",});
  }
});

app.put("/Products/:id", async (req, res) => {
  try{
    const { id } = req.params;
    const updatedProductFields = req.body;
    const updatedProduct = await product.findOneAndUpdate(
      {id},
      updatedProductFields,
      {new:true},
    );
    res.json(updatedProduct);
  }catch(error) {
    res.status(500).json({ message: "Error updating Product" });
  }
});

app.listen(5050, () => {
  console.log("Server is Running on PORT 5050");
});
