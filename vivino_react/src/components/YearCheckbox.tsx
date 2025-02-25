import React, { useContext, useState } from "react";
import { displayYearContext } from "../pages/DatabasePage";

const uniqueYears = [
  "1990","1992","1996","2002","2004","2007","2008","2009","2011","2012","2013","2014","2015","2016","2017","2018","2019","2020","2021","2022","2023", "Unknown Year"];

const CheckboxList: React.FC = () => {
  const [showAll, setShowAll] = useState<boolean>(false);
  const [includeAll, setIncludeAll] = useState<boolean>(true);
  const [checkedYearState, setCheckedYearState] = useContext(displayYearContext)

  const visibleItems = showAll ? uniqueYears : uniqueYears.slice(0, 3);

  const handleShowAllChange = () => {
    setIncludeAll(!includeAll);
    setCheckedYearState(new Array(uniqueYears.length).fill(!includeAll));
  };

  const handleCheckboxChange = (index: number) => {
    const updatedCheckedState = checkedYearState.map((item, idx) =>
      idx === index ? !item : item
    );
    setCheckedYearState(updatedCheckedState);
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
      {visibleItems.map((item, index) => (
        <label key={index} style={{ display: "block" }}>
          <input
            type="checkbox"
            checked={checkedYearState[index]}
            onChange={() => handleCheckboxChange(index)}
          />{" "}
          {item}
        </label>
      ))}
      {uniqueYears.length > 3 && (
        <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show less" : "See more"}
        </button>
      )}
    </div>
  );
};

export default CheckboxList;
