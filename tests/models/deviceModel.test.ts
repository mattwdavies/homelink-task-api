import knex from 'knex';
import knexConfig from '../../src/knexfile';
import * as deviceModel from '../../src/models/deviceModel';

const db = knex(knexConfig);

beforeAll(async () => {
  await db.migrate.latest();
});

afterAll(async () => {
  await db.destroy();
});

afterEach(async () => {
  await db('devices').truncate();
});

describe('Device Model', () => {
  it('should create a device', async () => {
    const newDevice = { name: 'Test Device', type: 'sensor', model: 'T1000', status: true };
    const [createdDevice] = await deviceModel.createDevice(newDevice);
    expect(createdDevice).toMatchObject(newDevice);
    expect(createdDevice).toHaveProperty('id');
  });

  it('should retrieve all devices', async () => {
    await deviceModel.createDevice({ name: 'Device 1', type: 'sensor', model: 'M1', status: true });
    await deviceModel.createDevice({ name: 'Device 2', type: 'camera', model: 'M2', status: false });

    const devices = await deviceModel.getAllDevices();
    expect(devices).toHaveLength(2);
  });

  it('should retrieve a device by ID', async () => {
    const [newDevice] = await deviceModel.createDevice({ name: 'Device 1', type: 'sensor', model: 'M1', status: true });
    const retrievedDevice = await deviceModel.getDeviceById(newDevice.id);
    expect(retrievedDevice).toEqual(newDevice);
  });

  it('should updat a device', async () => {
    const [newDevice] = await deviceModel.createDevice({ name: 'Device 1', type: 'sensor', model: 'M1', status: true });
    const updates = { name: 'Updated Device', status: false };

    const [updatedDevice] = await deviceModel.updateDevice(newDevice.id, updates);
    expect(updatedDevice).toMatchObject({ ...newDevice, ...updates });
  });

  it('should delete a device', async () => {
    const [newDevice] = await deviceModel.createDevice({ name: 'Device 1', type: 'sensor', model: 'M1', status: true });
    const deleteResult = await deviceModel.deleteDevice(newDevice.id);

    expect(deleteResult).toBe(1);
    const deletedDevice = await deviceModel.getDeviceById(newDevice.id);
    expect(deletedDevice).toBeUndefined();
  });
});
