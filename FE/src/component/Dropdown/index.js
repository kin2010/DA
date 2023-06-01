import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useFormikContext } from "formik";
import { useState } from "react";
import { useEffect } from "react";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

function getStyles(name, value, theme) {
  return {
    fontWeight:
      value.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function DropdownTeacger({ data }) {
  const theme = useTheme();
  const [value, setValue] = React.useState([]);
  const { setFieldValue } = useFormikContext();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(typeof value === "string" ? value.split(",") : value);
    setFieldValue("teachers", value || []);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: "100%", margin: 0 }}>
        <InputLabel id="demo-multiple-chip-label">Teacher</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={data?.find((z) => z?._id === value)?.fullName}
                  color="primary"
                />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {data?.map((data) => (
            <MenuItem
              key={data?._id}
              value={data?._id}
              style={getStyles(data?.fullName, value, theme)}
            >
              {data?.fullName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
