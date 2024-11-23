const { Router } = require("express");

const router = Router();

const CountryController = require("./app/controllers/CountryController");


router.get("/countries", CountryController.index);
router.get("/countries/:id", CountryController.show);

module.exports = router;
