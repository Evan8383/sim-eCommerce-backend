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
    if (!tag) return res.status(404).json(`Could not find tag with the id: ${tagId}`)
    res.json(tag)
});

router.post('/', async (req, res) => {
    const { tag_name: tagName, product_ids: productIds } = req.body

    const newTag = await Tag.create({ tag_name: tagName, product_ids: [productIds] })
    if (req.body.product_ids.length) {
        const productTagIdArr = req.body.product_ids.map((product_id) => {
            return {
                tag_id: newTag.id,
                product_id
            }
        })
        const newProductTag = await ProductTag.bulkCreate(productTagIdArr)
        res.status(200).json(newProductTag);
    }
});

router.put('/:id', async (req, res) => {
    // update a tag's name by its `id` value\
    const tagIdToUpdate = req.params.id
    const { tag_name: tagName, product_ids: productIds } = req.body;

    const updatedTag = await Tag.update({ tag_name: tagName }, {
        where: {
            id: tagIdToUpdate
        }
    });
    if (productIds && productIds.length) {
        const getAllProductTags = await ProductTag.findAll({
            where: {
                tag_id: tagIdToUpdate
            }
        })
        // current product_ids attached to a tag
        const existingProductTagIds = getAllProductTags.map(({ product_id }) => product_id)
        // * product_ids entered by user is stored as an array in productIds
        const newProductTags = productIds.filter((product_id) => !existingProductTagIds.includes(product_id))
            .map((product_id) => {
                return {
                    tag_id: tagIdToUpdate,
                    product_id
                };
            });

        const toBeDeletedProductTags = getAllProductTags.filter(({ product_id }) => !productIds.includes(product_id))
            .map(({ id }) => id)
        await ProductTag.destroy({
            where:
            {
                id: toBeDeletedProductTags
            }
        })
        const newProductTagsCreated = await ProductTag.bulkCreate(newProductTags)

        res.json(newProductTagsCreated)
    }








});

router.delete('/:id', async (req, res) => {
    try {
        const tagId = req.params.id
        const deletedTag = await Tag.destroy({
            where: {
                id: tagId
            }
        })
        if (!deletedTag) return res.status(404).json(`Could not find tag with the id: ${tagId}`)
        res.status(200).json(deletedTag)
    } catch (err) {
        res.status(500).json(err)
    }
    // delete on tag by its `id` value
});

module.exports = router;
