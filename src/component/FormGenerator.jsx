import { TextField } from "@mui/material";
import React from "react";

const FormGenerator = ({ forms,setForms,currentForm }) => {
// generate form dynamically with validation
  return (
    <>
      {forms[currentForm].map((x, i) => {
        return (
          <TextField
          key={x.name}
            {...x}
            size="small"
           sx={{margin:'8px', width:'calc(100% - 20px)'}}
            error={forms[currentForm][i].error}
            onChange={(e) => {
              forms[currentForm][i]['value'] = e.target.value;
              forms[currentForm][i]['error'] = (x.type === 'number'&&x.max)?!(parseFloat(e.target.value)>=0 && parseFloat(e.target.value)<=x.max):false
                setForms({ ...forms });
            }}
          />
        );
      })}
    </>
  );
};

export default FormGenerator;
