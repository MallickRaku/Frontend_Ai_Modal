import React from "react";

function ProtectedComponent({ children }: any) {
  const isUserLoggedIn = localStorage.getItem("loggedIn");
  return isUserLoggedIn ? children : null;
}

export default ProtectedComponent;
