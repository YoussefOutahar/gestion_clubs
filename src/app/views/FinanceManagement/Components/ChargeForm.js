import { Button,Grid, Icon,styled,} from "@mui/material";
import { Span } from "../../../components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../../DataBase/Clients/SupabaseClient";

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const ChargeForm = () => {
  const [state, setState] = useState({ date: new Date() });

  useEffect(() => {
    ValidatorForm.addValidationRule("isInvoiceMatch", (value) => {
      if (value !== state.Invoice) return false;

      return true;
    });
    return () => ValidatorForm.removeValidationRule("isInvoiceMatch");
  }, [state.Invoice]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Insert data into the "Activities" table
      const { data, error } = await supabase
        .from('Activites')
        .insert([
          { 
            libelle: eventName,
            Budget: totalCost,
            Earnings: Earning,
            Supp_budget: suppBudget
          },
        ]);
    
      if (error) {
        console.error(error);
      } else {
        console.log("Data inserted successfully:", data);
      }
  
      // Upload file to Supabase Storage
      const file = event.target.Invoice.files[0];
      const { data: fileData, error: fileError } = await supabase.storage
        .from("Budget_event")
        .upload(`invoices/${file.name}`, file);
  
      if (fileError) {
        console.error(fileError);
      } else {
        console.log("File uploaded successfully:", fileData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (event) => {
    event.persist();
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleDateChange = (date) => setState({ ...state, date });

  const {
    eventName,
    totalCost,
    Earning,
    suppBudget,
    Invoice,
  } = state;

  return (
    <div>
      <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
        <Grid container spacing={6}>
          <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
            <TextField
              type="text"
              name="eventName"
              id="standard-basic"
              value={eventName || ""}
              onChange={handleChange}
              errorMessages={["this field is required"]}
              label="Event Name"
              validators={["required"]}
            />

            <TextField
              type="number"
              name="totalCost"
              label="Total Cost"
              onChange={handleChange}
              value={totalCost || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />

            <TextField
              type="number"
              name="Earning"
              label="Earnings"
              onChange={handleChange}
              value={Earning || ""}
              errorMessages={["this field is required"]}
              validators={["required"]}
            />

            <TextField
              type="text"
              name="suppBudget"
              value={suppBudget || ""}
              label="supplimentary Budget"
              onChange={handleChange}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <input
              type="file"
              name="Invoice"
              id="invoice-input"
              onChange={handleChange}
              accept=".pdf,.doc,.docx"
              style={{ display: "none" }}
            />
            <label htmlFor="invoice-input" >
              <Button  sx={{ mb: 4 }} color="primary" component="span" variant="outlined">
                 Upload Invoice
              </Button>
            </label>
            
          </Grid>
        </Grid>

        <Button color="primary" variant="contained" type="submit" marginTop="20px">
          <Icon>send</Icon>
          <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
        </Button>
      </ValidatorForm>
    </div>
  );
};

export default ChargeForm;
