import React from "react";
import styled from "styled-components";

import { getColorCodeForSystolic, getColorCodeForDiastolic } from "../helpers";

const Grid = styled.div`
  overflow-y: hidden;
  overflow-x: hidden;
  margin: 0 auto;
  height: 9.5em;
  width: 90%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  column-gap: 3px;
  row-gap: 3px;
  border: 1px solid black;
  margin-bottom: 6px;
  padding-left: 16px;
  grid-template-areas:
    "date top rate"
    "date bottom rate";
`;

const DatePanel = styled.div`
  grid-area: date;
  width: 100%;
  text-align: center;
  height: 100px;
  line-height: 100px;
  white-space: nowrap;
  font-size: 1.17em;

  display: flex;
  flex-direction: column;
`;

const ControlPanel = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  padding: 0 35%;
`;

const ActionIcon = styled.div`
  width: 28px;
  height: ${(props) => `${props.height}px`};
  background: url(${(props) => props.url});
  bottom: ${(props) => `${props.bottom ? props.bottom + "px" : 0}`};
  position: relative;
  margin: 0 9px;
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
  color: ${(props) => props.color};
`;

const BottomPanel = styled.div`
  position: relative;
  grid-area: bottom;
  text-align: center;
  line-height: 43px;
  white-space: nowrap;
  font-size: 1.6em;
  color: ${(props) => props.color};
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
    props.delta > 0 ? "red" : props.delta < 0 ? "blue" : "grey"};
  font-size: 0.5em;
  position: relative;
  top: -26px;
  right: 6px;
  &:after {
    border-right: solid 8px transparent;
    border-left: solid 8px transparent;
    border-top: ${(props) =>
      props.delta > 0 ? "" : props.delta < 0 ? "solid 8px blue" : ""};
    border-bottom: ${(props) =>
      props.delta > 0 ? "solid 8px red" : props.delta < 0 ? "" : ""};
    position: relative;
    z-index: -1;
    content: "";
    top: ${(props) =>
      props.delta > 0 ? "-12px" : props.delta < 0 ? "12px" : ""};
    left: 7px;
  }
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
  },
  onSelect,
  deleteMeasurement
}) => {
  var d = new Date(`${date}T00:00:00`);

  const renderDelta = (delta, value) => {
    return (
      <DeltaDisplay delta={value === delta ? 0 : delta}>{delta}</DeltaDisplay>
    );
  };

  return (
    <Grid>
      <DatePanel>
        <div>{d.toDateString()}</div>
        <ControlPanel>
          <ActionIcon
            area="edit"
            url={"/edit.png"}
            height={33}
            onClick={onSelect}
            bottom={3}
          />
          <ActionIcon
            area="delete"
            url={"/delete.png"}
            height={26}
            onClick={deleteMeasurement}
          />
        </ControlPanel>
      </DatePanel>

      <TopPanel color={getColorCodeForSystolic(parseInt(systolicPressure, 10))}>
        {systolicPressure} mm Hg
        {renderDelta(systolicPressureDelta, systolicPressure)}
      </TopPanel>
      <BottomPanel
        color={getColorCodeForDiastolic(parseInt(diastolicPressure, 10))}
      >
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
