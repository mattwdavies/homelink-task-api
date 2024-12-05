import { Router } from 'express';
import * as deviceController from '../controllers/deviceController';

const router = Router();

router.post('/', deviceController.registerDevice);
router.get('/', deviceController.listAllDevices);
router.get('/:id', deviceController.getDeviceDetails);
router.put('/:id', deviceController.updateDeviceStatus);
router.delete('/:id', deviceController.deleteDevice);

export default router;
