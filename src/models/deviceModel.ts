import knex from 'knex';
import knexConfig from '../knexfile';

const db = knex(knexConfig);

export interface Device {
  id?: number;
  name: string;
  type: string;
  status: string;
}

export const createDevice = async (device: Device) => {
  return await db('devices').insert(device).returning('*');
};

export const getAllDevices = async () => {
  return await db('devices').select('*');
};

export const getDeviceById = async (id: string) => {
  return await db('devices').where({ id }).first();
};

export const updateDevice = async (id: number, updates: Partial<Device>) => {
  return await db('devices').where({ id }).update(updates).returning('*');
};

export const deleteDevice = async (id: number) => {
  return await db('devices').where({ id }).del();
};

