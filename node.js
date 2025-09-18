// server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

let products = [
  { id: 1, name: "Raccoon", price: 150000, image_url: "..." },
  { id: 2, name: "Butterfly", price: 350000, image_url: "..." }
];
let orders = [];

// Products
app.get("/products", (req, res) => res.json(products));
app.post("/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});
app.put("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.map(p => p.id === id ? { ...p, ...req.body } : p);
  res.json({ success: true });
});
app.delete("/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

// Orders
app.post("/orders", (req, res) => {
  const order = { id: Date.now(), ...req.body };
  orders.push(order);
  res.json(order);
});
app.get("/orders", (req, res) => res.json(orders));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("Server running on " + port));
