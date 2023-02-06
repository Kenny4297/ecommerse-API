const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //! find all categories
  //! be sure to include its associated Products
  //Here we await a response from finding all the Catagories, making sure that 'products' is included due to a relationship with 'category_id'
  try {
    const getCategory = await Category.findAll({
      include: [Product]
    });
    res.status(200).json(getCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    //We use the params supplied by the user to find the specific parameter id. We also must include the product as well due to the relationship between category and product (category_id)
    const getSpecificData = await Category.findByPk(req.params.id, {
      include: [Product]
    });
    //If no category is found:
    if (!getSpecificData) {
      res.status(404).json({ message: 'Category ID not found!' });
      return;
    }
    //If a category is found, we return that data
    res.status(200).json(getSpecificData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await Category.create({
      category_name: req.body,
    });
    res.status(201).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      //Since we are updating this category, we need to find what we are updating specifically!
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'Category ID not found!' });
      return;
    }
    res.status(204).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const deleteData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(202).json(deleteData);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
