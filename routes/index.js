const express = require('express')

const router = express.Router();

const { singupValidator , loginValidator,createOrderValidation } = require("../middlewares/validations/validator");
const handelValidator = require("../middlewares/handelValidator");

const UserController = require("../controllers/UserController");
const OrderController = require("../controllers/OrderController");

router.post('/login' , loginValidator() , handelValidator, UserController.login)
router.post('/singup', singupValidator() , handelValidator, UserController.singUp)
router.patch('/users/:id', UserController.updateUser)
router.delete('/users/:id' , UserController.deleteUser)
router.get('/users' , UserController.findUsers)

router.post('/orders',createOrderValidation() , handelValidator ,OrderController.createOrder )
router.get('/orders', OrderController.getOrders)
router.patch('/orders/:id', createOrderValidation(), handelValidator,OrderController.updateOrder)
router.delete('/orders/:id',OrderController.deleteOrders)

router.get('/pdf' , OrderController.getOrdersPDF);

module.exports = router;