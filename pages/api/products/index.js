import { products } from "../_data/products";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      const filteredProducts = req.query.category
        ? products.filter((product) => product.category === req.query.category)
        : products;
      return res.status(200).json(
        filteredProducts.map((p) => {
          const { detail, ...rest } = p;
          return rest;
        })
      );
    default:
      return res.status(400).json({ error: "method not supported" });
  }
}
