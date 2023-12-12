const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    const getAllCategories = await Category.findAll({ include: Product })
    res.status(200).json(getAllCategories)
  } catch (err) {
    res.status(500).send(err)
  }
});

router.get('/:id', async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product })
    if (!category) return res.status(404).json('No user found with that ID')
    return res.status(200).json(category)
  } catch (err) {
    res.status(500).send('There was an error')
  }
});

router.post('/', async (req, res) => {
  try {
    const { category_name: name } = req.body
    if (!name) return res.status(400).json('Please enter a category name')
    
    const newCategory = await Category.create({ category_name: name })
    res.json(newCategory)
  } catch (err) {
    res.status(500).json(err.errors[0].message)
  }
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
