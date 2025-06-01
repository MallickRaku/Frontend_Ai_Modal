import React from "react";

function ShortMessage({ message }: any) {
  const style = {
    fontSize: "12px",
    color: "red",
    fontWeight: "bold",
    width: "100%",
  };

  return <p style={{ ...style }}>{message}</p>;
}

export default ShortMessage;
