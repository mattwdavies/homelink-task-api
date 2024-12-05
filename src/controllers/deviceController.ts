import { Response, RequestHandler } from 'express';
import * as deviceModel from '../models/deviceModel';
import { HttpStatus, ErrorMessage } from '../constants/httpConstants';

const handleControllerError = (res: Response, error: unknown, message: string, statusCode: HttpStatus): void => {
  console.error(error);
  res.status(statusCode).json({ error: message });
};

// Register a new device
export const registerDevice: RequestHandler = async (req, res): Promise<void> => {
  try {
    const newDevice = await deviceModel.createDevice(req.body);
    res.status(HttpStatus.CREATED).json(newDevice);
  } catch (error) {
    handleControllerError(res, error, ErrorMessage.DEVICE_REGISTER_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

// Retrieve all devices
export const listAllDevices: RequestHandler = async (_req, res): Promise<void> => {
  try {
    const devices = await deviceModel.getAllDevices();
    res.status(HttpStatus.OK).json(devices);
  } catch (error) {
    handleControllerError(res, error, ErrorMessage.DEVICES_RETRIEVE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

// Get details of a specific device by ID
export const getDeviceDetails: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const device = await deviceModel.getDeviceById(id);
    if (!device) {
      res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessage.DEVICE_NOT_FOUND });
      return;
    }
    res.status(HttpStatus.OK).json(device);
  } catch (error) {
    handleControllerError(res, error, ErrorMessage.DEVICE_DETAILS_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

// Update details of a device
export const updateDeviceStatus: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const updatedDevice = await deviceModel.updateDevice(Number(id), req.body);
    if (!updatedDevice) {
      res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessage.DEVICE_NOT_FOUND });
      return;
    }
    res.status(HttpStatus.OK).json(updatedDevice);
  } catch (error) {
    handleControllerError(res, error, ErrorMessage.DEVICE_UPDATE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};

// Delete a device
export const deleteDevice: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;
  try {
    const result = await deviceModel.deleteDevice(Number(id));
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessage.DEVICE_NOT_FOUND });
      return;
    }
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    handleControllerError(res, error, ErrorMessage.DEVICE_DELETE_FAILED, HttpStatus.INTERNAL_SERVER_ERROR);
  }
};
