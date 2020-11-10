import React from "react";

function Auth({ children }) {
  return (
    <div style={{
      maxWidth: "520px",
      margin: "0 auto",
      justifyContent: "center",
      alignItems: "center",
      display: "flex",
      minHeight: "100%",
    }}>
      {children}
    </div>
  );
}

export default Auth;
