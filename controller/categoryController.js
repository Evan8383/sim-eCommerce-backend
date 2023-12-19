const { Category, Product } = require('../models');

const category_index = async (req, res) => {
  try {
    const getAllCategories = await Category.findAll({ include: Product })
    res.status(200).json(getAllCategories)
  } catch (err) {
    res.status(500).send(err)
  }
};

const category_details = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, { include: Product })
    if (!category) return res.status(404).json('No category found with that ID')
    return res.status(200).json(category)
  } catch (err) {
    res.status(500).send('There was an error')
  }
};

const category_post = async (req, res) => {
  try {
    const { category_name: name } = req.body
    if (!name) return res.status(400).json('Please enter a category name')

    const newCategory = await Category.create({ category_name: name })
    res.json(newCategory)
  } catch (err) {
    res.status(500).json(err.errors[0].message)
  }
};

const category_update = async (req, res) => {
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
};

const category_delete = async (req, res) => {
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
};

module.exports = {
  category_index,
  category_details,
  category_post,
  category_update,
  category_delete
}