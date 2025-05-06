const Category = require('../models/Category');
exports.getAllCategories = async (req, res) => {
  const categories = await Category.find();
  res.json(categories);
};
/*
// علشان اعمل تيست عليهااااااااا
exports.getStaticCategories = (req, res) => {
  const staticCategories = [
    {
      name: "Men",
      slug: "men",
      image: "images/men.jpg"
    },
    {
      name: "Women",
      slug: "women",
      image: "images/women.jpg"
    },
    {
      name: "Kids",
      slug: "kids",
      image: "images/kids.jpg"
    },
    {
      name: "Accessories",
      slug: "accessories",
      image: "images/accessories.jpg"
    }
  ];
  res.json(staticCategories);
};

*/