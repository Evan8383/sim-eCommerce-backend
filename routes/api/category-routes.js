const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const getAllCategories = await Category.findAll({include: Product})
    res.status(200).json(getAllCategories)
  } catch (err) {
    res.status(500).send(err)
  }
  // find all categories
  // be sure to include its associated Products
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {include: Product})
    if (!category) return res.status(404).json('No user found with that ID')
    return res.status(200).json(category)
  } catch(err) {
    res.status(500).send('There was an error')
  }
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
