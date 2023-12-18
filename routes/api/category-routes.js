const router = require('express').Router();
const categoryController = require('../../controller/categoryController')
// const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', categoryController.category_index);

router.get('/:id', categoryController.category_details);

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

router.put('/:id', async (req, res) => {
  try {
    const categoryId = req.params.id
    const { category_name: categoryName } = req.body
    if (!categoryName) return res.status(404).json('Please enter a category name to update')

    const updateCategoryName = await Category.update({ category_name: categoryName }, {
      where: {
        id: categoryId
      }
    });
    res.json(updateCategoryName)
  } catch (err) {
    res.status(500).json(err)
  }
});

router.delete('/:id', async (req, res) => {
    try {
    const categoryId = req.params.id
    const updateCategoryName = await Category.destroy({
      where: {
        id: categoryId
      }
    });
    res.json(updateCategoryName)
  } catch (err) {
    res.status(500).json(err)
  }
});

module.exports = router;
