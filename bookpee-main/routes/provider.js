const express = require('express');
const provider_router = express.Router();
const provider_controller = require('../controllers/provider');
const path = require("path");

provider_router.post("/createBook", provider_controller.createBook);
provider_router.post("/getBookDetail", provider_controller.getBookDetail);
provider_router.post("/updateBook", provider_controller.updateBook);
provider_router.post("/",provider_controller.getAllBooks);
provider_router.get("/genres", provider_controller.getAllGenres);
provider_router.post("/search", provider_controller.search);
provider_router.post("/filter", provider_controller.filter);
provider_router.post("/detail", provider_controller.getDetail);
provider_router.post("/deleteAllSelected", provider_controller.deleteAllSelected);
provider_router.post("/deleteSelected", provider_controller.deleteSelected);


module.exports = provider_router;