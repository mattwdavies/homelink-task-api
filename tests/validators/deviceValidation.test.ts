import { deviceSchema, deviceUpdateSchema } from '../../src/validators/deviceValidation';

describe('Device Validation', () => {
  it('should validate a valid device schema', async () => {
    const validDevice = { name: 'Device', type: 'sensor', model: 'M100', status: true };
    await expect(deviceSchema.validate(validDevice)).resolves.toEqual(validDevice);
  });

  it('should throw validation errors for an invalid device schema', async () => {
    const invalidDevice = { name: '', type: 123, model: '', status: 'invalid' };
    await expect(deviceSchema.validate(invalidDevice)).rejects.toThrow();
  });

  it('should validate a valid update schema', async () => {
    const validUpdate = { name: 'Updated Device', status: false };
    await expect(deviceUpdateSchema.validate(validUpdate)).resolves.toEqual(validUpdate);
  });

  it('should throw validation errors for an invalid update schema', async () => {
    const invalidUpdate = { name: 123, status: 'invalid' };
    await expect(deviceUpdateSchema.validate(invalidUpdate)).rejects.toThrow();
  });
});
