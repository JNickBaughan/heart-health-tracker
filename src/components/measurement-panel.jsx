import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Grid = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 0 auto;
  height: 8em;
  width: 85em;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 1fr 1fr;
  column-gap: 3px;
  row-gap: 3px;
  border: 1px solid black;
  grid-template-areas:
    "date top rate"
    "date top rate"
    "controls top rate"
    "controls bottom rate"
    "blank bottom rate"
    "blank bottom rate";
`;

const DatePanel = styled.div`
  grid-area: date;
  width: 100%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
  font-size: 1.17em;
`;

const ControlPanel = styled.div`
  grid-area: controls;
  height: 100%;
  width: 100%;
`;

const TopPanel = styled.div`
  position: relative;
  grid-area: top;
  height: 100%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
  font-size: 1.6em;
`;

const BottomPanel = styled.div`
  position: relative;
  grid-area: bottom;

  text-align: center;

  line-height: 43px;
  white-space: nowrap;
  font-size: 1.6em;
`;
const RatePanel = styled.div`
  position: relative;
  grid-area: rate;
  height: 100%;
  text-align: center;
  line-height: 133px;
  white-space: nowrap;
  font-size: 2.17em;
`;

const DeltaDisplay = styled.span`
  color: ${(props) =>
    props.delta > 0 ? "red" : props.delta < 0 ? "green" : "blue"};
  font-size: 0.5em;
  position: absolute;
  bottom: 20px;
  right: 140px;
`;

const MeasurementPanel = ({
  measurement: {
    date,
    systolicPressure,
    systolicPressureDelta,
    diastolicPressure,
    diastolicPressureDelta,
    heartRate,
    heartRateDelta
  }
}) => {
  var d = new Date(date);

  const renderDelta = (delta, value) => {
    return (
      <DeltaDisplay delta={value === delta ? 0 : delta}>{delta}</DeltaDisplay>
    );
  };

  return (
    <Grid>
      <DatePanel>{d.toDateString()}</DatePanel>
      <ControlPanel />
      <TopPanel>
        {systolicPressure} mm Hg
        {renderDelta(systolicPressureDelta, systolicPressure)}
      </TopPanel>
      <BottomPanel>
        {diastolicPressure} mm Hg
        {renderDelta(diastolicPressureDelta, diastolicPressure)}
      </BottomPanel>
      <RatePanel>
        {heartRate} BPM {renderDelta(heartRateDelta, heartRate)}
      </RatePanel>
    </Grid>
  );
};

export default MeasurementPanel;
