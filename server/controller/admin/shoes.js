const Shoe = require("../../models/shoes");

const addProducts = async (req, res) => {
  try {
    const body = req.body;
    // const imageURLs = [];
    // if (!req.files) {
    //   imageAmount = 0;
    // } else {
    //   req.files.map((e) => {
    //     imageURLs.push(e.path);
    //   });
    // }
    // imageAmount = imageURLs.length;
    const request = await Shoe.create({
      name: body.name,
      sizes: body.sizes,
      prices: body.prices,
      quantity: body.quantiy,
      image: body.image,
      company:body.company
    });
    if (request) {
      res.status(200).json({ data: request, success: true });
    } else {
      res
        .status(400)
        .json({ message: "Internal server error", success: false });
    }
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error, success: false });
  }
};
const removeProducts = async (req, res) => {
  try {
    const id = req.params.id;
    const request = await Shoe.findOneAndDelete({ id });
    if (!request) {
      res.status(200).json({ data: request, success: true });
    } else {
      res
        .status(400)
        .json({ message: "Internal server error", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
const updateProducts = async (req, res) => {
  try {
    const body = req.body;
    const imageURLs = [];
    if (!req.files) {
      imageAmount = 0;
    } else {
      req.files.map((e) => {
        imageURLs.push(e.path);
      });
    }
    imageAmount = imageURLs.length;
    const request = await Shoe.create({
      name: body.name,
      sizes: body.sizes,
      prices: body.prices,
      quantity: body.quantiy,
      image: imageURLs,
    });
    if (request) {
      res.status(200).json({ data: request, success: true });
    } else {
      res
        .status(400)
        .json({ message: "Internal server error", success: false });
    }
  } catch (error) {
    res.status(400).json({ error: error, success: false });
  }
};
module.exports = {
    addProducts,
    removeProducts,
    updateProducts
}