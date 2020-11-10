import React from "react";

function ErrorPage({
  errorCode,
  errorTitle,
  errorDescription,
  returnButtonTitle,
  returnButtonLink,
  returnButtonOnclick,
}) {
  return (
    <div>
      <div>{errorCode}</div>
      <div>{errorTitle}</div>
      <div>{errorDescription}</div>
    </div>
  );
}

export default ErrorPage;
