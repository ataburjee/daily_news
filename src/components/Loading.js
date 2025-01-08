import React, { Component } from "react";

export default function Loading(props) {
  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ height: "70vh" }}
    >
      <img
        src="https://media.tenor.com/GpecqxTO34AAAAAC/loader.gif"
        alt="loading..."
        style={{
          width: props.width || 0,
          height: props.height || 0,
        }}
      />
    </div>
  );
}
