const express = require('express')

const router = express.Router();

const { singupValidator , loginValidator } = require("../middlewares/validations/validator");
const handelValidator = require("../middlewares/handelValidator");

const UserController = require("../controllers/UserController")

router.post('/login' , loginValidator() , handelValidator, UserController.login)
router.post('/singup', singupValidator() , handelValidator, UserController.singUp)
router.patch('/users/:id')
router.delete('/users/:id')
router.get('/users')

router.post('/orders')
router.get('/orders')
router.patch('/orders/:id')
router.delete('/orders/:id')

module.exports = router;