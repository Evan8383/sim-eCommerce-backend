const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');
const { findAll } = require('../../models/Category');

// The `/api/tags` endpoint
router.get('/', async (req, res) => {
  const getAllTags = await Tag.findAll({
    include: [
      Product
    ]
  })
  res.json(getAllTags)
});

router.get('/:id', async (req, res) => {
  const tagId = req.params.id
  const tag = await Tag.findByPk(tagId, {
    include: [
      Product
    ]
  })
  res.json(tag)
});

router.post('/', async (req, res) => {
  const { tag_name: tagName, product_ids: productIds } = req.body

  const newTag = await Tag.create({tag_name: tagName, product_ids: [productIds]})
  if ( req.body.product_ids.length) {
    const productTagIdArr = req.body.product_ids.map((product_id)=> {
      return {
        tag_id: newTag.id,
        product_id
      }
    })
    const newProductTag = await ProductTag.bulkCreate(productTagIdArr)
    res.status(200).json(newProductTag);
  }
});

router.put('/:id', (req, res) => {
  // update a tag's name by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
