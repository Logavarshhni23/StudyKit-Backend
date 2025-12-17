const express = require("express");
const router = express.Router();
const Products = require("../models/Products");

router.get("/", async(req, res) => {
    const products = await Products.find();
    if(products){
       res.status(200).json(products);
    }
    else{
      res.status(400).json({error:"Product not found"});
    }
});                                    

router.post("/", async (req, res) => {
  try {
    const { name, image, sellingprice, originalprice, category } = req.body;
    const lastProduct = await Products.findOne().sort({ id: -1 });
    const newId = lastProduct ? lastProduct.id + 1 : 1;

    const product = await Products.create({
      id: newId,
      name,
      image,
      sellingprice,
      originalprice,
      category,
    });

    res.status(201).json({
      message: "Product created successfully",
      product,
    });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});  

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedProduct = await Products.findOneAndDelete({ id: id });

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully", product: deletedProduct });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;


/* const express = require("express");
const fs = require("fs");
const router = express.Router();

router.get("/", (req, res) => {
  const products = fs.readFileSync("./data/products.json");
  res.json(JSON.parse(products));
});
router.get("/:id", (req, res) => {
  console.log("id= ", req.params.id);
  const data = fs.readFileSync("./data/products.json");
  const products = JSON.parse(data);
  const product = products.find((p) => {
    return p.id === parseInt(req.params.id);
  });
  if (product) {
    console.log("Product= ", product);
  } else {
    console.log("not defined");
  }
  res.json(product);
});

router.delete("/:id", (req, res) => {
  const products = fs.readFileSync("./data/products.json");
  const updatedProducts = JSON.parse(products).filter((p) => {
    return p.id !== parseInt(req.params.id);
  });
  fs.writeFileSync("./data/products.json", JSON.stringify(updatedProducts, null, 2));
  res.status(200).json({ message: "Product deleted successFully" });
});


router.post("/", (req, res) => {
  const products = JSON.parse(fs.readFileSync("./data/products.json"));
  const newProduct = {
    id: products.length > 0 ? products[products.length - 1].id + 1 : 1,
    name: req.body.name,
    image: req.body.image,
    sellingprice: req.body.sellingprice,
    originalprice: req.body.originalprice,
    category: req.body.category,
  };
  const updatedProducts = [...products, newProduct];
  fs.writeFileSync("./data/products.json", JSON.stringify(updatedProducts, null, 2));
  res.status(201).json(newProduct);
});



module.exports = router;
 */