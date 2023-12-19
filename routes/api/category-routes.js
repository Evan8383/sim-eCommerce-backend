const router = require('express').Router();
const categoryController = require('../../controller/categoryController')
// const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', categoryController.category_index);

router.get('/:id', categoryController.category_details);

router.post('/', categoryController.category_post);

router.put('/:id', categoryController.category_update);

router.delete('/:id', categoryController.category_delete);

module.exports = router;
