// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { HeartMeasurement } = initSchema(schema);

export {
  HeartMeasurement
};