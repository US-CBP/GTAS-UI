import React from "react";
import "./Loading.css";

export default function Loading() {
  return (
    <div className="loading">
      <i className="fa fa-spinner fa-pulse fa-4x fa-fw"></i>
      <span className="sr-only">Loading...</span>
    </div>
  );
}
