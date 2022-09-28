import React from "react";
import { Alert } from "react-bootstrap";

export default function Message({ value, children }) {
  return <Alert variant={value}>{children}</Alert>;
}
Message.defaultPros = {
  value: "info",
};
