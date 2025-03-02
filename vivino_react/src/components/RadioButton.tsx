import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { styled } from "@mui/material/styles";

// Custom styled components to match theme
const WineFormControl = styled(FormControl)({
  width: '100%',
  display: 'flex',
  alignItems: 'center'
});

const WineFormLabel = styled(FormLabel)({
  color: 'rgb(145, 35, 60, 0.8)', // wine color with opacity
  fontFamily: 'Cinzel, serif',
  fontSize: '1.1rem',
  marginBottom: '1rem'
});

const WineRadio = styled(Radio)({
  color: 'rgb(212, 175, 55, 0.3)', // gold color with opacity
  '&.Mui-checked': {
    color: 'rgb(145, 35, 60)', // wine color
  }
});

const WineFormControlLabel = styled(FormControlLabel)({
  '& .MuiFormControlLabel-label': {
    fontFamily: 'Cinzel, serif',
    color: 'rgb(145, 35, 60, 0.8)', // wine color with opacity
  }
});

export default function RowRadioButtonsGroup({handleFieldChange, searchField}) {
  return (
    <WineFormControl>
      <WineFormLabel id="wine-search-radio-group-label">
        Select Search Type
      </WineFormLabel>
      <RadioGroup
        row
        aria-labelledby="wine-search-radio-group-label"
        name="wine-search-radio-group"
        sx={{
          justifyContent: 'center',
          gap: '2rem'
        }}
      >
        <WineFormControlLabel
          name="searchField"
          checked={searchField === 'vineyard'}
          value="vineyard"
          onChange={handleFieldChange}          
          control={<WineRadio />}
          label="Vineyard"
        />
        <WineFormControlLabel
          name="searchField"
          checked={searchField === 'brand'}          
          value="brand"
          onChange={handleFieldChange}          
          control={<WineRadio />}
          label="Brand"
        />
        <WineFormControlLabel
          name="searchField"
          checked={searchField === 'both'}                    
          value="both"
          onChange={handleFieldChange}          
          control={<WineRadio />}
          label="Both"
        />
      </RadioGroup>
    </WineFormControl>
  );
}