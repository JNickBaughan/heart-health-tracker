import React from "react";
import { useFormik } from "formik";
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
  const [submitted, setSubmitted] = React.useState(false);
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
      setSubmitted(true);
      if (inEditMode) {
        updateMeasurement(values, () => {
          setSubmitted(false);
        });
        return;
      }
      addMeasurement(values, () => {
        setSubmitted(false);
      });
    },
    validationSchema: HeartHealthSchema
  });

  return (
    <div>
      <ValidatableInput
        hasError={
          !!formik.errors.systolicPressure && formik.touched.systolicPressure
        }
        label={"Date"}
        id={"date"}
        handleChange={(date) => {
          setSelectedMeasurement((prevDetails) => ({
            ...prevDetails,
            date: new Date(date).toISOString().split("T")[0]
          }));
        }}
        handleBlur={formik.handleBlur}
        value={
          (formik.values &&
            formik.values.date &&
            new Date(`${formik.values.date}T00:00:00`)) ||
          ""
        }
        errorMessage={formik.errors.date}
        hasError={!!formik.errors.date && formik.touched.date}
        isDate={true}
      />
      <ValidatableInput
        hasError={
          !!formik.errors.systolicPressure && formik.touched.systolicPressure
        }
        label={"Systolic Pressure"}
        id={"systolicPressure"}
        handleChange={(systolicPressure) => {
          formik.handleChange("systolicPressure", systolicPressure);
          setSelectedMeasurement((prevDetails) => ({
            ...prevDetails,
            systolicPressure
          }));
        }}
        handleBlur={formik.handleBlur}
        value={formik.values.systolicPressure}
        errorMessage={formik.errors.systolicPressure}
        placeholder={"enter top number"}
        submitted={submitted}
        inEditMode={inEditMode}
      />
      <ValidatableInput
        hasError={
          !!formik.errors.diastolicPressure && formik.touched.diastolicPressure
        }
        label={"Diastolic Pressure"}
        id={"diastolicPressure"}
        handleChange={formik.handleChange}
        handleChange={(diastolicPressure) => {
          setSelectedMeasurement((prevDetails) => ({
            ...prevDetails,
            diastolicPressure
          }));
        }}
        handleBlur={formik.handleBlur}
        value={formik.values.diastolicPressure}
        errorMessage={formik.errors.diastolicPressure}
        placeholder={"enter bottom number"}
        submitted={submitted}
        inEditMode={inEditMode}
      />
      <ValidatableInput
        hasError={!!formik.errors.heartRate && formik.touched.heartRate}
        label={"Heart Rate"}
        id={"heartRate"}
        handleChange={formik.handleChange}
        handleChange={(heartRate) => {
          setSelectedMeasurement((prevDetails) => ({
            ...prevDetails,
            heartRate
          }));
        }}
        handleBlur={formik.handleBlur}
        value={formik.values.heartRate}
        errorMessage={formik.errors.heartRate}
        placeholder={"enter rate"}
        submitted={submitted}
        inEditMode={inEditMode}
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
