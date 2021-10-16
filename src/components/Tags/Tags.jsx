import * as React from "react";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import { allTags } from "../../utils/constants";

const skills = [];
allTags.forEach((item) => skills.push({ label: item }));

const Tags = () => {
  return (
    <Stack spacing={3} sx={{ width: 500 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={skills}
        getOptionLabel={(option) => option.label}
        filterSelectedOptions
        renderInput={(params) => <TextField {...params} label="Skills" />}
      />
    </Stack>
  );
};

export default Tags;
