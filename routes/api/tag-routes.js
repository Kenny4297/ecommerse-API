const router = require('express').Router();
const { Tag, Product, ProductTag, Category } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data

  const getTag = await Tag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(getTag);
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  
  const getTag = await Tag.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(getTag);
});

router.post('/', async (req, res) => {
  // create a new tag
  try {
    const createTag = await Tag.create({
      tag_name: req.body,
    });
    res.status(200).json(createTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    const updateCategory = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    if (!Tag[0]) {
      res.status(404).json({ message: 'No Category with this id!' });
      return;
    }
    res.status(200).json(Tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tagToDelete = await Tag.destroy({
    where: {
      id: req.params.id
    },
  }).catch((err) => res.json(err));
  res.json(tagToDelete);
});

module.exports = router;
