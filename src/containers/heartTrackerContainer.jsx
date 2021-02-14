import React, { useState, useEffect } from "react";
import styled from "styled-components";

import GlobalState from "../context";

import MeasurementPanel from "../components/measurement-panel";
import MeasurementForm from "../components/measurement-form";
import TodoList from "../components/todo";
import Modal from "../components/common/modal";
import Button from "../components/common/button";

import { listHeartMeasurements } from "../graphql/queries";
import {
  createHeartMeasurement,
  updateHeartMeasurement,
  deleteHeartMeasurement
} from "../graphql/mutations";
import { API, graphqlOperation } from "aws-amplify";

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
  filter: ${(props) => `${props.blur ? "blur(3px)" : ""}`};
`;

const FormPanel = styled.div`
  grid-area: form;
  height: 100%;
  width: 100%;
`;

const GridPanel = styled.div`
  grid-area: grid;
  height: 100%;
  width: 90%;
  border-bottom: 3px solid black;
  overflow-y: scroll;
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
  const [inEditMode, setInEditMode] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [measurementToDelete, setMeasurementToDelete] = useState(null);

  const select = (id) => {
    const index = measurements.findIndex(
      (measurement) => measurement.id === id
    );

    if (index > -1) {
      setSelectedMeasurement(measurements[index]);
      setInEditMode(true);
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

  const deleteMeasurement = (del) => {
    API.graphql(
      graphqlOperation(deleteHeartMeasurement, {
        input: {
          id: del.id,
          _version: del._version
        }
      })
    )
      .then(() => {
        setMeasurements(
          addDeltas(
            sortMeasurements([
              ...measurements.filter((measurement) => measurement.id !== del.id)
            ])
          )
        );
      })
      .catch(() => {
        alert("whoops something went wrong!");
      });
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

  const updateMeasurement = (update, callback) => {
    API.graphql(
      graphqlOperation(updateHeartMeasurement, {
        input: {
          id: update.id,
          heartRate: parseInt(update.heartRate),
          systolicPressure: parseInt(update.systolicPressure),
          diastolicPressure: parseInt(update.diastolicPressure),
          date: new Date(update.date).toISOString().split("T")[0],
          _version: update._version
        }
      })
    )
      .then((result) => {
        const {
          data: { updateHeartMeasurement }
        } = result;
        setMeasurements(
          addDeltas(
            sortMeasurements(
              measurements.map((measurement) => {
                return measurement.id === updateHeartMeasurement.id
                  ? updateHeartMeasurement
                  : measurement;
              })
            )
          )
        );
        setSelectedMeasurement(defaultMeasurement);
        setInEditMode(false);
        callback && callback();
      })
      .catch(() => {
        alert("whoops something went wrong!");
      });
  };

  const addMeasurement = (measurement, callback) => {
    API.graphql(
      graphqlOperation(createHeartMeasurement, {
        input: {
          heartRate: measurement.heartRate,
          systolicPressure: measurement.systolicPressure,
          diastolicPressure: measurement.diastolicPressure,
          date: new Date(measurement.date).toISOString().split("T")[0]
        }
      })
    )
      .then((result) => {
        const {
          data: { createHeartMeasurement }
        } = result;
        setMeasurements(
          addDeltas(
            sortMeasurements([
              ...measurements,
              {
                ...createHeartMeasurement
              }
            ])
          )
        );
        setSelectedMeasurement(defaultMeasurement);
        setInEditMode(false);
        callback && callback();
      })
      .catch(() => {
        alert("whoops something went wrong!");
      });
  };

  useEffect(() => {
    API.graphql(graphqlOperation(listHeartMeasurements)).then((results) => {
      const {
        data: {
          listHeartMeasurements: { items }
        }
      } = results;

      setMeasurements(
        addDeltas(sortMeasurements(items.filter((item) => !item._deleted)))
      );
    });
  }, []);

  return (
    <React.Fragment>
      <GlobalState.Provider
        value={{
          measurements
        }}
      >
        <Grid blur={showConfirmation}>
          <FormPanel>
            <TodoList />
            <MeasurementForm
              measurement={selectedMeasurement}
              setSelectedMeasurement={setSelectedMeasurement}
              addMeasurement={addMeasurement}
              updateMeasurement={updateMeasurement}
              inEditMode={inEditMode}
            />
          </FormPanel>
          <GridPanel>
            {measurements.map((measurement) => {
              return (
                <MeasurementPanel
                  key={measurement.id}
                  onSelect={() => {
                    setInEditMode(true);
                    select(measurement.id);
                  }}
                  deleteMeasurement={() => {
                    setMeasurementToDelete(measurement);
                    setShowConfirmation(true);
                  }}
                  measurement={measurement}
                />
              );
            })}
          </GridPanel>
        </Grid>
      </GlobalState.Provider>
      {showConfirmation && (
        <Modal>
          <p>Are you sure you want to delete this measurement?</p>
          <br />
          <br />
          <br />
          <br />
          <Button
            onClick={() => {
              setShowConfirmation(false);
            }}
            title={"Cancel"}
          />
          <Button
            onClick={() => {
              deleteMeasurement(measurementToDelete);
              setShowConfirmation(false);
            }}
            title={"Delete"}
          />
        </Modal>
      )}
    </React.Fragment>
  );
};

export default HeartTrackerContainer;
