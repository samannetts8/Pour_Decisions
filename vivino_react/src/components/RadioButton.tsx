import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

export default function RowRadioButtonsGroup({handleFieldChange,searchField}) {




    return (
    <FormControl>
      <FormLabel id="demo-row-radio-buttons-group-label">
        Database Search Criteria
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
      >
        <FormControlLabel
          name="searchField"
          checked={searchField === 'vineyard'}
          value="vineyard"
          onChange={handleFieldChange}          
          control={<Radio />}
          label="Vineyard"
        />
        <FormControlLabel
          name="searchField"
          checked={searchField === 'brand'}          
          value="brand"
          onChange={handleFieldChange}          
          control={<Radio />}
          label="Brand"
        />
        <FormControlLabel
          name="searchField"
          checked={searchField === 'Vineyard and Brand'}                    
          value="Vineyard and Brand"
          onChange={handleFieldChange}          
          control={<Radio />}
          label="Vineyard and Brand"
        />
      </RadioGroup>
    </FormControl>
  );
}
