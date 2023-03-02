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
      label: "House Rent Allowance",
      variant: "outlined",
      type: "text",
      name: "hra",
      required: true,
      value: "",
      error: false,
    },
    {
      id: "lta",
      label: "Leave Travel Allowance",
      variant: "outlined",
      type: "number",
      name: "lta",
      required: false,
      value: "",
      error: false,
    },
    {
      id: "any other allowance",
      label: "Any Other Allowance",
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
      label: "80 C",
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
      label: "80 D",
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
      label: "80 TTA",
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
      label: "Rent Paid",
      variant: "outlined",
      type: "number",
      name: "RENT_PAID",
      required: false,
      value: "",
      error: false,
    },
    {
      id: "standard_deduction",
      label: "Standard Deduction",
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

// store old & new slabs and rule function required to calculate tax
export const order: any = {
  newSlab: [
    {
      label: "upto 250000",
      min: 0,
      max: 250000,
      percent: 0,
    },
    {
      label: "250001 to 500000",
      min: 250000,
      max: 500000,
      percent: 5,
    },
    {
      label: "500001 to 750000",
      min: 500000,
      max: 750000,
      percent: 10,
    },
    {
      label: "750001 to 1000000",
      min: 750000,
      max: 1000000,
      percent: 15,
    },
    {
      label: "1000001 to 1250000",
      min: 1000000,
      max: 1250000,
      percent: 20,
    },
    {
      label: "1250001 to 1500000",
      min: 1250000,
      max: 1500000,
      percent: 25,
    },
    {
      label: "1500001 to above",
      min: 1500000,
      max: Number.MAX_VALUE,
      percent: 30,
    },
  ],
  oldSlab: [
    {
      label: "upto 250000",
      min: 0,
      max: 250000,
      percent: 0,
    },
    {
      label: "250001 to 500000",
      min: 250000,
      max: 500000,
      percent: 5,
    },
    {
      label: "500001 to 1000000",
      min: 500000,
      max: 1000000,
      percent: 20,
    },
    {
      label: "1000001 to above",
      min: 1000000,
      max: Number.MAX_VALUE,
      percent: 30,
    },
  ],
  rule: (amount: number, mn: number, mx: number, p: number) => {
    let tx = amount > mx - mn ? mx - mn : amount;
    tx = (tx * p) / 100;
    return [amount > mx - mn ? amount - (mx - mn) : 0, tx];
  },
};
