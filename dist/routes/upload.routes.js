"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uploadDataTwitter_controller_1 = require("../controller/uploadDataTwitter.controller");
const router = (0, express_1.Router)();
/* GET: /api/upload */
router.get('/upload', uploadDataTwitter_controller_1.uploadDataTwitterController);
exports.default = router;
