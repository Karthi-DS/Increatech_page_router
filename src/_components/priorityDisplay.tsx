import { faFire } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const PriorityDisplay = ({ priority }: { priority: number }) => {
  // Create an array with the length of the priority value
  const icons = Array.from({ length: priority });

  return (
    <div>
      {icons.map((_, index) => (
        <FontAwesomeIcon key={index} icon={faFire} />
      ))}
    </div>
  );
};

export default PriorityDisplay;
