/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createHeartMeasurement = /* GraphQL */ `
  mutation CreateHeartMeasurement(
    $input: CreateHeartMeasurementInput!
    $condition: ModelHeartMeasurementConditionInput
  ) {
    createHeartMeasurement(input: $input, condition: $condition) {
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
export const updateHeartMeasurement = /* GraphQL */ `
  mutation UpdateHeartMeasurement(
    $input: UpdateHeartMeasurementInput!
    $condition: ModelHeartMeasurementConditionInput
  ) {
    updateHeartMeasurement(input: $input, condition: $condition) {
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
export const deleteHeartMeasurement = /* GraphQL */ `
  mutation DeleteHeartMeasurement(
    $input: DeleteHeartMeasurementInput!
    $condition: ModelHeartMeasurementConditionInput
  ) {
    deleteHeartMeasurement(input: $input, condition: $condition) {
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
