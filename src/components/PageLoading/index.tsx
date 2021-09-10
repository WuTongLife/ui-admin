import React, { Component } from "react";
import { LoadingComponentProps } from "react-loadable";

const PageLoading = (props: LoadingComponentProps) => {
  return props.error ? (
    <div>
      Error! <button onClick={props.retry}>Retry</button>
    </div>
  ) : props.timedOut ? (
    <div>
      Taking a long time... <button onClick={props.retry}>Retry</button>
    </div>
  ) : props.pastDelay ? (
    <div>Loading...</div>
  ) : null;
};

export default PageLoading;
