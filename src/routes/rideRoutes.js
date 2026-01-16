"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const rideController_1 = require("../controllers/rideController");
const router = (0, express_1.Router)();
const rideController = new rideController_1.RideController();
router.post('/request', rideController.create);
router.post('/:rideId/accept', rideController.accept);
router.get('/:rideId', rideController.getStatus);
exports.default = router;
//# sourceMappingURL=rideRoutes.js.map