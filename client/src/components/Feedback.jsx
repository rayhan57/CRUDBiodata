import React from "react";
import { Alert } from "react-bootstrap";

function Feedback({ variant, text, setShowFeedback }) {
  return (
    <>
      <Alert
        variant={variant}
        className="pb-0 mb-2"
        onClose={() => setShowFeedback(false)}
        dismissible
      >
        <p dangerouslySetInnerHTML={{ __html: text }}></p>
      </Alert>
    </>
  );
}

export default Feedback;
