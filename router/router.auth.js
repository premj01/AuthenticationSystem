const express = require('express');
const router = express.Router();

const { register, validOTP } = require('../middleware/authMiddleware')


router.post("/register", register);
router.post("/register/otp", validOTP);

module.exports = router;