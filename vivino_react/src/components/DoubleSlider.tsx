import { Slider, styled } from "@mui/material";
import { useState } from "react";

// Define TypeScript type for the slider value
type RangeSliderProps = {
  min?: number;
  max?: number;
  defaultValue?: [number, number];
  handleSliderChange: (newValue: number[]) => void;
  priceRange?: [number, number];
};

// Custom Styled Slider (Pretto.fr)
const PrettoSlider = styled(Slider)({
  color: "#722F37",
  height: 8,
  "& .MuiSlider-track": {
    border: "none",
  },
  "& .MuiSlider-thumb": {
    height: 24,
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid currentColor",
    "&:hover": {
      boxShadow: "0 0 0 8px rgba(114, 47, 55, 0.16)",
    },
    "&.Mui-active": {
      boxShadow: "0 0 0 14px rgba(114, 47, 55, 0.16)",
    },
  },
  "& .MuiSlider-valueLabel": {
    lineHeight: 1.2,
    fontSize: 12,
    background: "unset",
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: "50% 50% 50% 0",
    backgroundColor: "#722F37",
    transformOrigin: "bottom left",
    transform: "translate(50%, -100%) rotate(-45deg) scale(0)",
    "&:before": { display: "none" },
    "&.MuiSlider-valueLabelOpen": {
      transform: "translate(50%, -100%) rotate(-45deg) scale(1)",
    },
    "& > *": {
      transform: "rotate(45deg)",
    },
  },
});

const RangeSlider: React.FC<RangeSliderProps> = ({handleSliderChange,priceRange,
  min = 0,
  max = 30,
  }) => {
  return (
    <PrettoSlider
      value={priceRange}
      onChange={(event,newValue) => handleSliderChange(event,newValue)}
      valueLabelDisplay="auto"
      min={min}
      max={max}
    />
  );
};

export default RangeSlider;
