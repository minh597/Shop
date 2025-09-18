import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public")); // để load index.html, admin.html

let products = [
  { id: 1, name: "Raccoon", price: 150000, image_url: "https://i.postimg.cc/mDRRpHLg/images-3.jpg" },
  { id: 2, name: "Butterfly", price: 350000, image_url: "https://i.postimg.cc/YCGbZD0d/Thy-Butterfly-V2.png" },
  { id: 3, name: "Giày sneakers", price: 750000, image_url: "https://i.ibb.co/30BqT5q/sneakers.png" }
];
let orders = [];

// API sản phẩm
app.get("/api/products", (req, res) => res.json(products));
app.post("/api/products", (req, res) => {
  const newProduct = { id: Date.now(), ...req.body };
  products.push(newProduct);
  res.json(newProduct);
});
app.put("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.map(p => p.id === id ? { ...p, ...req.body } : p);
  res.json({ success: true });
});
app.delete("/api/products/:id", (req, res) => {
  const id = parseInt(req.params.id);
  products = products.filter(p => p.id !== id);
  res.json({ success: true });
});

// API đơn hàng
app.post("/api/orders", (req, res) => {
  const order = { id: Date.now(), ...req.body };
  orders.push(order);
  res.json(order);
});
app.get("/api/orders", (req, res) => res.json(orders));

const port = process.env.PORT || 3000;
app.listen(port, () => console.log("✅ Server running on port " + port));
