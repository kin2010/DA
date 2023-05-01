/* eslint-disable no-unused-vars */
import * as React from "react";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";

export default function SearchAuto(props) {
  const { originValue, setValue } = props;

  const handleChange = (e) => {
    const vl = e?.target?.value;
    try {
      if (vl !== "") {
        const newlist = originValue?.filter((item) => {
          return (
            item?.fullName?.toUpperCase().indexOf(vl?.toUpperCase()) !== -1
          );
        });
        console.log("first,n", newlist);
        setValue(newlist);
      } else {
        setValue(originValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // useEffect(() => {
  //   if (value !== searchKeyword) {
  //     interval.current = setInterval(handleSearch, 300);
  //   } else {
  //     clearInterval(interval.current);
  //   }
  //   return () => {
  //     clearInterval(interval.current);
  //   };
  // }, [value, searchKeyword]);

  return (
    <FormControl variant="standard">
      <InputLabel htmlFor="input-with-icon-adornment">Tìm kiếm</InputLabel>
      <Input
        id="input-with-icon-adornment"
        startAdornment={
          <InputAdornment position="start">
            <AccountCircle />
          </InputAdornment>
        }
        onChange={handleChange}
      />
    </FormControl>
  );
}
