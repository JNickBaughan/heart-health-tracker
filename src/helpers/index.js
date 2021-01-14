export const getColorCodeForSystolic = (pressure) => {
  if (pressure < 121) {
    return "green";
  } else if (pressure > 120 && pressure < 131) {
    return "#CCCC00";
  } else if (pressure > 130 && pressure < 141) {
    return "orange";
  } else if (pressure > 140 && pressure < 181) {
    return "OrangeRed";
  }
  return "red";
};

export const getColorCodeForDiastolic = (pressure) => {
  if (pressure < 71) {
    return "green";
  } else if (pressure > 70 && pressure < 81) {
    return "#CCCC00";
  } else if (pressure > 80 && pressure < 91) {
    return "orange";
  } else if (pressure > 90 && pressure < 120) {
    return "OrangeRed";
  }
  return "red";
};
