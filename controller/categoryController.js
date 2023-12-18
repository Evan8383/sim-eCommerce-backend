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

module.exports = {
  category_index,
  category_details
}