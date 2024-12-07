import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export const seed = async (knex: Knex): Promise<void> => {
  await knex('devices').del();

  // insert seed data
  await knex('devices').insert([
    { id: uuidv4(), name: 'Device A', type: 'sensor', model: 'M100', status: true },
    { id: uuidv4(), name: 'Device B', type: 'actuator', model: 'A200', status: false },
    { id: uuidv4(), name: 'Device C', type: 'sensor', model: 'M300', status: true }
  ]);
};
