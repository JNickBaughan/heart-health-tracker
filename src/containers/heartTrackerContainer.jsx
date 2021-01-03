import React, { useState, useEffect } from "react";
import styled from "styled-components";

import { data } from "../mock-state/results";
import GlobalState from "../context";

import MeasurementPanel from "../components/measurement-panel";
import MeasurementForm from "../components/measurement-form";
import TodoList from "../components/todo";

const Grid = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 0 auto;
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 3fr;
  grid-template-rows: 1fr;
  column-gap: 3px;
  grid-template-areas: "form grid grid grid";
`;

const FormPanel = styled.div`
  grid-area: form;
  height: 100%;
  width: 100%;
`;

const GridPanel = styled.div`
  grid-area: grid;
  height: 100%;
  width: 100%;
  border-bottom: 3px solid black;
`;

const defaultMeasurement = {
  heartRate: "",
  systolicPressure: "",
  diastolicPressure: "",
  date: "",
  id: ""
};

const HeartTrackerContainer = () => {
  const [measurements, setMeasurements] = useState([]);
  const [selectedMeasurement, setSelectedMeasurement] = useState(
    defaultMeasurement
  );

  const select = (id) => {
    const index = measurements.findIndex(
      (measurement) => measurement.id === id
    );

    if (index > -1) {
      setSelectedMeasurement(measurements[index]);
    }
  };

  const calculateDelta = (curr, index, arr, field) => {
    return index + 1 < arr.length
      ? curr[field] - arr[index + 1][field]
      : curr[field];
  };

  const sortMeasurements = (measurements) => {
    return measurements.sort((a, b) => new Date(b.date) - new Date(a.date));
  };

  const addDeltas = (measurements) => {
    return measurements.map((measurement, index, arr) => {
      return {
        ...measurement,
        heartRateDelta: calculateDelta(measurement, index, arr, "heartRate"),
        systolicPressureDelta: calculateDelta(
          measurement,
          index,
          arr,
          "systolicPressure"
        ),
        diastolicPressureDelta: calculateDelta(
          measurement,
          index,
          arr,
          "diastolicPressure"
        )
      };
    });
  };

  const addMeasurement = (measurement) => {
    setMeasurements(
      addDeltas(sortMeasurements([...measurements, measurement]))
    );
    setSelectedMeasurement(defaultMeasurement);
  };

  useEffect(() => {
    // TODO: setup graphQL and make call here
    setMeasurements(addDeltas(sortMeasurements(data)));
  }, []);

  return (
    <React.Fragment>
      <GlobalState.Provider
        value={{
          measurements
        }}
      >
        <Grid>
          <FormPanel>
            <TodoList />
            <MeasurementForm
              measurement={selectedMeasurement}
              setSelectedMeasurement={setSelectedMeasurement}
              addMeasurement={addMeasurement}
            />
          </FormPanel>
          <GridPanel>
            {measurements.map((measurement) => {
              return (
                <MeasurementPanel
                  onSelect={() => {
                    select(measurement.id);
                  }}
                  measurement={measurement}
                />
              );
            })}
          </GridPanel>
        </Grid>
      </GlobalState.Provider>
    </React.Fragment>
  );
};

export default HeartTrackerContainer;
