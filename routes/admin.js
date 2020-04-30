const path = require('path');

const express = require('express');

const {
    body
} = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');


const router = express.Router();


router.get('/add-product', isAuth, adminController.getAddProduct);

router.post('/add-product', [
    body('title', 'Enter a valid product Title.').isString().isLength({
        min: 3
    }).trim(),
    body('price', 'Enter a valid product Price.').isFloat().trim(),
    body('description', 'Description should more than 10 characters and less 400').trim().isLength({
        min: 10,
        max: 500
    })
], isAuth, adminController.postAddProduct);

router.get('/products', isAuth, adminController.getProducts);

router.get('/edit-product/:productId', [
    body('title').isString().isLength({
        min: 3
    }).trim(),
    body('price').isFloat().trim(),
    body('description').trim().isLength({
        min: 10,
        max: 500
    })
], isAuth, adminController.getEditProduct);

router.post('/edit-product', isAuth, adminController.postEditProduct);

router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;