export type formType = {
  id: string;
  label: string;
  variant: string;
  type: string;
  name: string;
  required?: boolean;
  value: string;
  error: boolean;
  max?: number;
  helperText?: string;
  disabled?: boolean;
};

export type formsType = {
  Income_Details: formType[];
  Deduction: formType[];
  metrocity: boolean;
};

export const initialForms: formsType = {
  Income_Details: [
    {
      id: "Basic Salry",
      label: "Basic Salary",
      variant: "outlined",
      type: "text",
      name: "basic_salary",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "hra",
      label: "HRA",
      variant: "outlined",
      type: "text",
      name: "hra",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "lta",
      label: "LTA",
      variant: "outlined",
      type: "number",
      name: "lta",
      max: 2000,
      helperText: "value should less than 2000",
      required: false,
      value: "",
      error: false,
    },
    {
      id: "any other allowance",
      label: "AOL",
      variant: "outlined",
      type: "number",
      name: "AOL",
      required: false,
      value: "",
      error: false,
    },
  ],
  Deduction: [
    {
      id: "80C",
      label: "80C",
      variant: "outlined",
      type: "number",
      name: "80C",
      max: 150000,
      helperText: "value should less than 150000",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "80D",
      label: "80D",
      variant: "outlined",
      type: "number",
      name: "80D",
      max: 12000,
      helperText: "value should less than 12000",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "80TTA",
      label: "80TTA",
      variant: "outlined",
      type: "number",
      name: "80TTA",
      max: 8000,
      helperText: "value should less than 8000",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "rent_paid",
      label: "RENT PAID",
      variant: "outlined",
      type: "number",
      name: "RENT_PAID",
      required: false,
      value: "",
      error: false,
    },
    {
      id: "standard_deduction",
      label: "STANDARD DEDUCTION",
      variant: "outlined",
      type: "number",
      name: "STANDARD_DEDUCTION",
      disabled: true,
      value: "50000",
      error: false,
    },
  ],
  metrocity: false,
};
