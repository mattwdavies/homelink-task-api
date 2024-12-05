import request from 'supertest';
import express from 'express';
import deviceRoutes from '../../src/routes/deviceRoutes';

const app = express();
app.use(express.json());
app.use('/api/devices', deviceRoutes);

describe('Device Controller', () => {
  it('should create a device', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', status: 'off' };
    const response = await request(app).post('/api/devices').send(newDevice);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.name).toBe(newDevice.name);
  });

  it('should retrieve all devices', async () => {
    const response = await request(app).get('/api/devices');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should retrieve a device by ID', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', status: 'off' };
    const createdResponse = await request(app).post('/api/devices').send(newDevice);
    const deviceId = createdResponse.body.id;
    const response = await request(app).get(`/api/devices/${deviceId}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.objectContaining(newDevice));
  });

  it('should update a device', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', status: 'off' };
    const createdResponse = await request(app).post('/api/devices').send(newDevice);
    const deviceId = createdResponse.body.id;
    const updatedResponse = await request(app).put(`/api/devices/${deviceId}`).send({ status: 'on' });
    expect(updatedResponse.status).toBe(200);
    expect(updatedResponse.body.status).toBe('on');
  });

  it('should delete a device', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', status: 'off' };
    const createdResponse = await request(app).post('/api/devices').send(newDevice);
    const deviceId = createdResponse.body.id;
    const deleteResponse = await request(app).delete(`/api/devices/${deviceId}`);
    expect(deleteResponse.status).toBe(204);
    const getResponse = await request(app).get(`/api/devices/${deviceId}`);
    expect(getResponse.status).toBe(404); // Device should not be found
  });
});
