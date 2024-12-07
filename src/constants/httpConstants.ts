export enum HttpStatus {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500,
}

export enum ErrorMessage {
  DEVICE_REGISTER_FAILED = 'Failed to register device',
  DEVICES_RETRIEVE_FAILED = 'Failed to retrieve devices',
  DEVICE_DETAILS_FAILED = 'Failed to retrieve device details',
  DEVICE_UPDATE_FAILED = 'Failed to update device',
  DEVICE_DELETE_FAILED = 'Failed to delete device',
  DEVICE_NOT_FOUND = 'Device not found',
  INVALID_DEVICE_ID = 'Invalid device ID format'
}
