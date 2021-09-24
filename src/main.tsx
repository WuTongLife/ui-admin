import { message } from "antd";
import React from "react";
import ReactDOM from "react-dom";
import App from "./app";
import "./global.less";

message.config({
  maxCount: 1
});

ReactDOM.render(<App />, document.getElementById("root"));
