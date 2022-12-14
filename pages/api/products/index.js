import connectDB from "../_db/connect-db";
import { Product } from "../_db/models/Product";

async function handler(req, res) {
  switch (req.method) {
    case "GET":
      try {
        const filter = {};
        if (req.query.category) {
          filter.category = req.query.category;
        }
        const products = await Product.find(filter);
        res.status(200).json(products);
        //   const products = await Product.find({ category: req.query.category });
        //   res.status(200).json(products);
        // } else if (req.query.name) {
        //   const products = await Product.find({ name: req.query.name });
        //   res.status(200).json(products);
        // } else if (req.query._id) {
        //   const products = await Product.find({ _id: req.query._id });
        //   res.status(200).json(products);
        // } else {
        //   const products = await Product.find({});
        //   res.status(200).json(products);
        // }
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      break;
    case "POST":
      try {
        const newProduct = new Product({
          name: req.body.name,
          category: req.body.category,
          detail: req.body.detail,
        });
        await newProduct.save();
        res.status(200).json(newProduct);
        console.log(newProduct);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }

      break;

    default:
      return res.status(400).json({ error: "method not supported" });
  }
}

export default connectDB(handler);
