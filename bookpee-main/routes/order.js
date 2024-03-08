const express = require('express');
const order_router = express.Router();
const order_controller = require('../controllers/order');
const path = require("path");


order_router.get("/genres", order_controller.getAllGenres);

order_router.post("/filter", order_controller.filter);
order_router.post("/detail", order_controller.getDetail);
order_router.post("/favorauthor", order_controller.favorAuthor);
order_router.post("/createorder", order_controller.createOrder);
order_router.post("/addbookorder", order_controller.addBookToOrder);
order_router.post("/addcode", order_controller.addPromotionCode);
order_router.post("/confirm", order_controller.confirm);
order_router.post("/delete", order_controller.delete);
order_router.post("/calctotalwithpromo", order_controller.calc_price_with_promo);
module.exports = order_router;