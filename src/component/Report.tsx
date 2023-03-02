import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { formsType, order } from "./controllerData";
import useQuery from "./customHook/useQuery";

type calculateTaxType = (
  amount: number,
  taxSlab: any,
  rule: any,
  tax?: number,
  index?: number
) => number;

export default function Report({ forms }: { forms: formsType }) {
  // customHook to get value of required key if we dont know index in form
  const getKeyValue = useQuery();

  // calculating Tax using recursion 
  const calculateTax: calculateTaxType = (amount,taxSlab,rule,tax = 0,index = 0) => {
    if (taxSlab.length === index || amount <= 0) return Math.round(tax);
    const [calAmt, calcTax] = rule(amount,taxSlab[index].min,taxSlab[index].max,taxSlab[index].percent);
    return calculateTax(calAmt, taxSlab, rule, tax + calcTax, index + 1);
  };


  // generate view data from forms values and call calculate Tax
  const generateReport = () => {
    let data: any = {};
     // getting basic salary by help of customhook 
    let baseSalary = getKeyValue(forms.Income_Details, "basic_salary");
    // calculate total income
    data["Total_Income"] = forms.Income_Details.reduce((total, x) => {
      return total + (x.value ? parseInt(x.value) : 0);
    }, 0);
    // calculate total deduction
    data["Total_Deduction"] = forms.Deduction.reduce((total, x) => {
      if (x.name === "RENT_PAID") return total;
      return total + (x.value ? parseInt(x.value) : 0);
    }, 0);
    
    let actualHra = getKeyValue(forms.Income_Details, "hra");
    let rentPaid = getKeyValue(forms.Deduction, "RENT_PAID") - baseSalary / 10;
    let minimum = Math.min(actualHra, rentPaid); //minumum for lowest HRA
    if (forms.metrocity)
      minimum = baseSalary / 2 < minimum ? baseSalary / 2 : minimum;
    minimum = minimum > 0 ? minimum : 0;

    data["HRA_Deduction"] = minimum;
    data["Total_Deduction"] += minimum;
    data["Taxable_Amount"] =
      data["Total_Income"] - data["Total_Deduction"] > 0
        ? data["Total_Income"] - data["Total_Deduction"]
        : 0;
        // calculate old regime tax
      data["OLD_Total_Payble_Tax"] = calculateTax(
          data["Taxable_Amount"],
          order.oldSlab,
          order.rule
        );
        // calculate new regime tax
    data["NEW_Total_Payble_Tax"] = calculateTax(
      data["Taxable_Amount"],
      order.newSlab,
      order.rule
    );
    // return data for final view 
    return data;
  };

  const card = (
    <React.Fragment>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} gutterBottom>
          Income Details:
        </Typography>
        {forms.Income_Details.map((detail) => (
          <Typography key={detail.label} color="text.secondary" sx={{ fontSize: 14 }}>
            {detail.label} : ₹ {detail.value ? parseInt(detail.value) : 0}
          </Typography>
        ))}
        <Typography sx={{ fontSize: 14, mt: 1 }} gutterBottom>
          Deduction Details:
        </Typography>
        {forms.Deduction.map((detail) => (
          <Typography key={detail.label} color="text.secondary" sx={{ fontSize: 14 }}>
            {detail.label} : ₹ {detail.value ? parseInt(detail.value) : 0}
          </Typography>
        ))}

        <Typography sx={{ fontSize: 20, mt: 1}} gutterBottom>
          Tax Report:
        </Typography>
        {Object.entries(generateReport()).map(([key, value]: any) => (
            <Typography key={key+value} color="text.primary" sx={{ }}>
              {key.replaceAll('_',' ')} : ₹ {value}
            </Typography>
        ))}
      </CardContent>
      <CardActions>
        <Button size="small">DOWNLOAD REPORT</Button>
      </CardActions>
    </React.Fragment>
  );
  return (
    <Box sx={{ minWidth: 275 }}>
      <Card variant="outlined">{card}</Card>
    </Box>
  );
}
