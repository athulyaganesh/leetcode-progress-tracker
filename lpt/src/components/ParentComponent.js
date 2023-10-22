// ParentComponent.js
import React, { useState } from "react";
import UserAuthentication from "./UserAuthentication";

const ParentComponent = () => {
  const [authenticated, setAuthenticated] = useState(false);

  return (
    <UserAuthentication setAuthenticated={setAuthenticated(authenticated)} />
  );
};

export default ParentComponent;