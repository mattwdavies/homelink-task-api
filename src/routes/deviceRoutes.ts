import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

// This is where we could create a middleware function, like `authenticateJWT`, to check for a JWT in the `Authorization` header.
// We could apply this middleware to routes managing devices to ensure only authenticated users or services can perform these operations.
const router = Router();

router.post('/', deviceController.registerDevice);
router.get('/', deviceController.listAllDevices);
router.get('/:id', deviceController.getDeviceDetails);
router.put('/:id', deviceController.updateDeviceStatus);
router.delete('/:id', deviceController.deleteDevice);

export default router;
