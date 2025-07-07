const express = require("express");
const router = express.Router();

const {signUp, login, getCurrentUser, updateProfile, updatePassword, imageUpload} = require("../controllers/userController");
const { authMiddleWare } = require("../middleware/auth");

// PUBLIC LINK
router.post('/signUp', signUp);
router.post('/login', login);

// PRIVATE LINKS need to be protected
router.get('/myDetails',authMiddleWare,  getCurrentUser);
router.put('/updateProfile', authMiddleWare,  updateProfile);
router.put('/updatePassword', authMiddleWare, updatePassword);
router.post('/imageUpload', authMiddleWare, imageUpload);

module.exports = router