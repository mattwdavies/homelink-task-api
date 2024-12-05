import knex from 'knex';
import knexConfig from '../knexfile';

const db = knex(knexConfig);

export interface Device {
  id?: string;
  name: string;
  type: string;
  model: string;
  status?: boolean;
}

export const createDevice = async (device: Device) => {
  try {
    return await db('devices').insert(device).returning('*');
  } catch (error) {
    console.error('db insert error:', error);
    throw error;
  }
};
export const getAllDevices = async () => {
  return await db('devices').select('*');
};

export const getDeviceById = async (id: string) => {
  return await db('devices').where({ id }).first();
};

export const updateDevice = async (id: string, updates: Partial<Device>) => {
  return await db('devices').where({ id }).update(updates).returning('*');
};

export const deleteDevice = async (id: string) => {
  return await db('devices').where({ id }).del();
};
