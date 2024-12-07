import { RequestHandler } from 'express';
import * as deviceModel from '../models/deviceModel';
import { HttpStatus, ErrorMessage } from '../constants/httpConstants';
import { deviceSchema, deviceUpdateSchema } from '../validators/deviceValidation';
import { ValidationError, Schema } from 'yup';

/**
 * validates data using a Yup schema
 * @returnsd - resolves with validated data if valid, rejects with an array of errors if invalid
 */
const validateWithYup = async <T>(schema: Schema<T>, data: unknown): Promise<T> => {
  return schema.validate(data, { abortEarly: false, stripUnknown: true });
};

// Register a new device
export const registerDevice: RequestHandler = async (req, res): Promise<void> => {
  try {
    const validatedData = await validateWithYup(deviceSchema, req.body);

    const newDevice = await deviceModel.createDevice(validatedData);
    res.status(HttpStatus.CREATED).json(newDevice[0]);
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: error.errors });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DEVICE_REGISTER_FAILED });
    }
  }
};

// Retrieve all devices
export const listAllDevices: RequestHandler = async (_req, res): Promise<void> => {
  try {
    const devices = await deviceModel.getAllDevices();
    res.status(HttpStatus.OK).json(devices);
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DEVICES_RETRIEVE_FAILED });
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
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DEVICE_DETAILS_FAILED });
  }
};

// Update a device
export const updateDeviceStatus: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const validatedData = await validateWithYup(deviceUpdateSchema, req.body);

    const updatedDevice = await deviceModel.updateDevice(id, validatedData);
    if (!updatedDevice.length) {
      res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessage.DEVICE_NOT_FOUND });
      return;
    }
    res.status(HttpStatus.OK).json(updatedDevice[0]);
  } catch (error) {
    console.error(error);
    if (error instanceof ValidationError) {
      res.status(HttpStatus.BAD_REQUEST).json({ errors: error.errors });
    } else {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DEVICE_UPDATE_FAILED });
    }
  }
};

// Delete a device by ID
export const deleteDevice: RequestHandler = async (req, res): Promise<void> => {
  const { id } = req.params;

  try {
    const result = await deviceModel.deleteDevice(id);
    if (!result) {
      res.status(HttpStatus.NOT_FOUND).json({ error: ErrorMessage.DEVICE_NOT_FOUND });
      return;
    }
    res.status(HttpStatus.NO_CONTENT).send();
  } catch (error) {
    console.error(error);
    res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ error: ErrorMessage.DEVICE_DELETE_FAILED });
  }
};
