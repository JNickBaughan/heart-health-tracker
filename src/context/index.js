import { createContext } from "react";

const GlobalState = createContext({
  measurements: []
  // updateMeasurement: () => {},
  // addMeasurement: () => {},
  // deleteMeasurement: () => {},
  // updateAllMeasurements: () => {}
});

export default GlobalState;
