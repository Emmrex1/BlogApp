const express = require("express");
const { adminLogin } = require("../controller/adminLogin.Controller");
const router = express.Router();


router.post("/admin-login", adminLogin);

module.exports = router;
