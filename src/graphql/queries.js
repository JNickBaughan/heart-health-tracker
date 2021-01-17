/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const syncHeartMeasurements = /* GraphQL */ `
  query SyncHeartMeasurements(
    $filter: ModelHeartMeasurementFilterInput
    $limit: Int
    $nextToken: String
    $lastSync: AWSTimestamp
  ) {
    syncHeartMeasurements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
      lastSync: $lastSync
    ) {
      items {
        id
        date
        heartRate
        systolicPressure
        diastolicPressure
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
export const getHeartMeasurement = /* GraphQL */ `
  query GetHeartMeasurement($id: ID!) {
    getHeartMeasurement(id: $id) {
      id
      date
      heartRate
      systolicPressure
      diastolicPressure
      _version
      _deleted
      _lastChangedAt
      createdAt
      updatedAt
    }
  }
`;
export const listHeartMeasurements = /* GraphQL */ `
  query ListHeartMeasurements(
    $filter: ModelHeartMeasurementFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listHeartMeasurements(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        date
        heartRate
        systolicPressure
        diastolicPressure
        _version
        _deleted
        _lastChangedAt
        createdAt
        updatedAt
      }
      nextToken
      startedAt
    }
  }
`;
