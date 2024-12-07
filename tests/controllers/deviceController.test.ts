import request from 'supertest';
import express from 'express';
import deviceRoutes from '../../src/routes/deviceRoutes';
import * as deviceModel from '../../src/models/deviceModel';

jest.mock('../../src/models/deviceModel');

const mock = <T>(fn: T): jest.Mock => fn as jest.Mock;

const app = express();
app.use(express.json());
app.use('/api/devices', deviceRoutes);

describe('Device Controller', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create a device', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', model: 'T1000', status: true };
    const createdDevice = { id: '1', ...newDevice };

    mock(deviceModel.createDevice).mockResolvedValue([createdDevice]);

    const response = await request(app).post('/api/devices').send(newDevice);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id', '1');
    expect(response.body.name).toBe(newDevice.name);
    expect(deviceModel.createDevice).toHaveBeenCalledWith(newDevice);
  });

  it('should retrieve all devices', async () => {
    const devices = [
      { id: '1', name: 'Device 1', type: 'sensor', model: 'M100', status: true },
      { id: '2', name: 'Device 2', type: 'actuator', model: 'A200', status: false },
    ];

    mock(deviceModel.getAllDevices).mockResolvedValue(devices);

    const response = await request(app).get('/api/devices');

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body).toEqual(devices);
    expect(deviceModel.getAllDevices).toHaveBeenCalledTimes(1);
  });

  it('should retrieve a device by ID', async () => {
    const device = { id: '1', name: 'Device 1', type: 'sensor', model: 'M100', status: true };

    mock(deviceModel.getDeviceById).mockResolvedValue(device);

    const response = await request(app).get(`/api/devices/${device.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(device);
    expect(deviceModel.getDeviceById).toHaveBeenCalledWith(device.id);
  });

  it('should return 404 when retrieving a non-existent device by ID', async () => {
    mock(deviceModel.getDeviceById).mockResolvedValue(null);

    const response = await request(app).get('/api/devices/999');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Device not found');
    expect(deviceModel.getDeviceById).toHaveBeenCalledWith('999');
  });

  it('should update a device', async () => {
    const deviceId = '1';
    const updates = { status: false };
    const updatedDevice = { id: deviceId, name: 'Device 1', type: 'sensor', model: 'M100', status: false };

    mock(deviceModel.updateDevice).mockResolvedValue([updatedDevice]);

    const response = await request(app).put(`/api/devices/${deviceId}`).send(updates);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(updatedDevice);
    expect(deviceModel.updateDevice).toHaveBeenCalledWith(deviceId, updates);
  });

  it('should return 404 when updating a non-existent device', async () => {
    const deviceId = '999';
    const updates = { status: false };

    mock(deviceModel.updateDevice).mockResolvedValue([]);

    const response = await request(app).put(`/api/devices/${deviceId}`).send(updates);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error', 'Device not found');
    expect(deviceModel.updateDevice).toHaveBeenCalledWith(deviceId, updates);
  });

  it('should delete a device', async () => {
    const deviceId = '1';

    mock(deviceModel.deleteDevice).mockResolvedValue(1);

    const deleteResponse = await request(app).delete(`/api/devices/${deviceId}`);

    expect(deleteResponse.status).toBe(204);
    expect(deviceModel.deleteDevice).toHaveBeenCalledWith(deviceId);
  });

  it('should return 404 when deleting a non-existent device', async () => {
    const deviceId = '999';

    mock(deviceModel.deleteDevice).mockResolvedValue(0);

    const deleteResponse = await request(app).delete(`/api/devices/${deviceId}`);

    expect(deleteResponse.status).toBe(404);
    expect(deleteResponse.body).toHaveProperty('error', 'Device not found');
    expect(deviceModel.deleteDevice).toHaveBeenCalledWith(deviceId);
  });
});
