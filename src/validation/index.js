import * as Yup from "yup";

const HeartHealthSchema = Yup.object().shape({
  heartRate: Yup.number()
    .typeError("Heart Rate must be numeric")
    .required("Heart Rate is Required"),
  systolicPressure: Yup.number()
    .typeError("Systolic Pressure must be numeric")
    .required("Systolic Pressure is Required"),
  diastolicPressure: Yup.number()
    .typeError("Diastolic Pressure must be numeric")
    .required("Diastolic Pressure is Required")
});

export default HeartHealthSchema;
