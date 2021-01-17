import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";





export declare class HeartMeasurement {
  readonly id: string;
  readonly date: string;
  readonly heartRate: number;
  readonly systolicPressure: number;
  readonly diastolicPressure: number;
  constructor(init: ModelInit<HeartMeasurement>);
  static copyOf(source: HeartMeasurement, mutator: (draft: MutableModel<HeartMeasurement>) => MutableModel<HeartMeasurement> | void): HeartMeasurement;
}