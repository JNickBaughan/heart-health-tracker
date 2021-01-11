import React from "react";
import styled from "styled-components";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Button from "./common/button";
import Modal from "./common/modal";
import "react-datepicker/dist/react-datepicker.css";

const Input = styled.input`
  width: 45%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
`;

const MeasurementForm = ({
  measurement,
  setSelectedMeasurement,
  addMeasurement,
  updateMeasurement,
  inEditMode
}) => {
  const formik = useFormik({
    initialValues: { ...measurement },
    enableReinitialize: true,
    handleChange: (event) => {
      setSelectedMeasurement((prevDetails) => ({
        ...prevDetails,
        [event.target.name]: event.target.value
      }));
    },
    onSubmit: (values) => {
      if (inEditMode) {
        updateMeasurement(values);
        return;
      }
      addMeasurement(values);
    }
  });
  return (
    <div>
      <label>Date</label>
      <br />
      <DatePicker
        id="date"
        type="date"
        selected={
          (formik.values &&
            formik.values.date &&
            new Date(formik.values.date)) ||
          null
        }
        onChange={(date) => {
          setSelectedMeasurement((prevDetails) => ({
            ...prevDetails,
            date
          }));
        }}
      />
      <br />
      <br />
      <label>Systolic Pressure</label>
      <br />
      <Input
        id="systolicPressure"
        name="systolicPressure"
        onChange={formik.handleChange}
        value={formik.values.systolicPressure}
      />
      <br />
      <br />
      <label>Diastolic Pressure</label>
      <br />
      <Input
        id="diastolicPressure"
        name="diastolicPressure"
        onChange={formik.handleChange}
        value={formik.values.diastolicPressure}
      />
      <br />
      <br />
      <label>Heart Rate</label>
      <br />
      <Input
        id="heartRate"
        name="heartRate"
        onChange={formik.handleChange}
        value={formik.values.heartRate}
      />
      <br />
      <br />
      <Button
        onClick={formik.handleSubmit}
        title={(inEditMode && "Update") || "Submit"}
      />
    </div>
  );
};

export default MeasurementForm;
