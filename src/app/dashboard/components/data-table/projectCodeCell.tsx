import React from "react";

interface ProjectCodeCellProps {
  projectCode: string;
}

const ProjectCodeCell: React.FC<ProjectCodeCellProps> = ({ projectCode }) => {
  const handleClick = () => {
    const inputElement = document.getElementById(
      "projectCodeFilterInput"
    ) as HTMLInputElement;

    if (inputElement) {
      // Create a native input setter
      const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
        window.HTMLInputElement.prototype,
        "value"
      )?.set;

      if (nativeInputValueSetter) {
        nativeInputValueSetter.call(inputElement, projectCode); // Set the value of the input

        // Create and dispatch the event to simulate a user input change
        const event = new Event("input", { bubbles: true });
        inputElement.dispatchEvent(event);
      }
    }
  };

  return (
    <div
      className="text-start cursor-pointer underline underline-offset-4"
      onClick={handleClick}
    >
      {projectCode}
    </div>
  );
};

export default ProjectCodeCell;
