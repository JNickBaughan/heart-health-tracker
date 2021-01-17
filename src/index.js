import React from "react";
import ReactDOM from "react-dom";
import HeartTrackerContainer from "./containers/heartTrackerContainer";

import Amplify from "aws-amplify";
import aws_exports from "./aws-exports";

Amplify.configure(aws_exports);

ReactDOM.render(<HeartTrackerContainer />, document.getElementById("root"));
