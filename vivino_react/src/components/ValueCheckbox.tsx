import React, { useContext, useState } from "react";
import { displayValueContext } from "../pages/DatabasePage";

const uniqueValue = [
    "Amazing Value!","Great Value","Good Value","Fair Value","Better Value Elsewhere","No Score"];

const CheckboxList: React.FC = () => {
  const [includeAll, setIncludeAll] = useState<boolean>(true);
  const [checkedValueState, setCheckedValueState] = useContext(displayValueContext)

  const handleShowAllChange = () => {
    setIncludeAll(!includeAll);
    setCheckedValueState(new Array(uniqueValue.length).fill(!includeAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedValueState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedValueState(updatedCheckedState);
  };

  return (
    <div className="block text-sm font-cinzel text-wine/80 mb-2">
      <label style={{ display: "block" }}>
        <input
          type="checkbox"
          checked={includeAll}
          onChange={handleShowAllChange}
        />{" "}
        Show All
      </label>
      {uniqueValue.map((item, index) => (
        <label key={index} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={checkedValueState[index]}
            onChange={() => handleCheckboxChange(index)}
          />{" "}
          {item}
        </label>
      ))}
    </div>
  );
};

export default CheckboxList;
