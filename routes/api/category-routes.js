const router = require('express').Router();
const { Category } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
    // find all categories
  // be sure to include its associated Products

  const getCategory = await Category.findAll().catch((err) => {
    res.json(err);
  });
  res.json(getCategory);
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const getCategory = await Category.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(getCategory);
});

router.post('/', async (req, res) => {
  // create a new category
  try {
    const createCategory = await User.create({
      category_name: req.body,
    });
    res.status(200).json(createCategory);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    const updateCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!updateCategory[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(updateCategory);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const categoryToDelete = await Category.destroy({
    where: {
      id: req.params.id
    },
  }).catch((err) => res.json(err));
  res.json(categoryToDelete);
});

module.exports = router;
