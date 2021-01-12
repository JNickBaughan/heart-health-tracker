import React from "react";
import { useFormik } from "formik";
import DatePicker from "react-datepicker";
import Button from "./common/button";
import ValidatableInput from "./common/input";
import "react-datepicker/dist/react-datepicker.css";
import HeartHealthSchema from "../validation";

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
    },
    validationSchema: HeartHealthSchema
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
      <ValidatableInput
        hasError={
          !!formik.errors.systolicPressure && formik.touched.systolicPressure
        }
        label={"Systolic Pressure"}
        id={"systolicPressure"}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.systolicPressure}
        errorMessage={formik.errors.systolicPressure}
      />
      <ValidatableInput
        hasError={
          !!formik.errors.diastolicPressure && formik.touched.diastolicPressure
        }
        label={"Diastolic Pressure"}
        id={"diastolicPressure"}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.diastolicPressure}
        errorMessage={formik.errors.diastolicPressure}
      />
      <ValidatableInput
        hasError={!!formik.errors.heartRate && formik.touched.heartRate}
        label={"Heart Rate"}
        id={"heartRate"}
        handleChange={formik.handleChange}
        handleBlur={formik.handleBlur}
        value={formik.values.heartRate}
        errorMessage={formik.errors.heartRate}
      />
      <br />
      <Button
        onClick={formik.handleSubmit}
        title={(inEditMode && "Update") || "Submit"}
      />
    </div>
  );
};

export default MeasurementForm;
