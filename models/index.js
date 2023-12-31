// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Categories have many Products
Category.Product = Category.hasMany(Product, {
  foreignKey: 'category_id',
  onDelete: 'cascade'

});

// Products belongsTo Category
Product.Category = Product.belongsTo(Category, {
  foreignKey: 'category_id',
  onDelete: 'cascade'
});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: {
    model: ProductTag,
    unique: false
  },
  onDelete: 'cascade',
  foreignKey: 'product_id',
  constraints: false
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: {
    model: ProductTag,
    unique: false
  },
  foreignKey: 'tag_id',
  onDelete: 'cascade',
  constraints: false
});

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
