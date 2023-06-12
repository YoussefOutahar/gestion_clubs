import { Button, Grid, Icon, styled, MenuItem, Box } from "@mui/material";
import { Span } from "../../../components/Typography";
import { useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import supabase from "../../../DataBase/Clients/SupabaseClient";
import { useNavigate } from "react-router-dom";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const ChargeForm = () => {
    const navigate = useNavigate();

    const [state, setState] = useState({
        date: new Date(),
        eventName: "",
        activities: [],
    });

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const { data, error } = await supabase.from("Activites").select("Name");
                if (error) {
                    console.error("Error fetching activities:", error);
                } else {
                    setState((prevState) => ({
                        ...prevState,
                        activities: data.map((activity) => activity.Name),
                    }));
                }
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    {
        /*useEffect(() => {
    ValidatorForm.addValidationRule("isInvoiceMatch", (value) => {
      if (value !== state.Invoice) return false;

      return true;
    });

    return () => {
      ValidatorForm.removeValidationRule("isInvoiceMatch");
    };
  }, [state.Invoice]);*/
    }

    //TODO:
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (selectedFile) {
            try {
                setUploading(true);
                const { file, error } = await supabase.storage
                    .from("Budget_event")
                    .upload(selectedFile.name, selectedFile);

                if (error) {
                    console.error("Error uploading file:", error.message);
                } else {
                    const fileUrl = "https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Budget_event/" + selectedFile.name;
                    const { data, error } = await supabase
                        .from("Activites")
                        .update([
                            {
                                Name: state.eventName,
                                Cost: state.totalCost,
                                Earnings: state.Earning,
                                //Supp_budget: state.suppBudget,
                                file_name: selectedFile.name,
                                url: fileUrl,
                            },
                        ])
                        .eq("Name", state.eventName);

                    if (error) {
                        console.error(error);
                    } else {
                        console.log("Data inserted successfully:", data);
                    }
                    console.log("File uploaded and reference saved successfully.");
                }
            } catch (error) {
                console.error("Error uploading file:", error.message);
            } finally {
                setUploading(false);
            }
        }
        // try {
        //

        //     const file = event.target.Invoice.files[0];
        //     const { data: fileData, error: fileError } = await supabase.storage
        //         .from("Budget_event")
        //         .upload(`invoices/${file.name}`, file);

        //     if (fileError) {
        //         console.error(fileError);
        //     } else {
        //         console.log("File uploaded successfully:", fileData);
        //     }
        //     // Redirect to finance page
        //     navigate("/finance");
        // } catch (error) {
        //     console.error(error);
        // }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setState((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const { eventName, totalCost, Earning, suppBudget, activities } = state;

    //Invoice
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                        <TextField
                            select
                            name="eventName"
                            value={eventName || ""}
                            onChange={handleChange}
                            errorMessages={["this field is required"]}
                            label="Event Name"
                            validators={["required"]}
                        >
                            {activities.map((activity, index) => (
                                <MenuItem key={index} value={activity}>
                                    {activity}
                                </MenuItem>
                            ))}
                        </TextField>

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

                        {/*<TextField
                            type="text"
                            name="suppBudget"
                            value={suppBudget || ""}
                            label="supplementary Budget"
                            onChange={handleChange}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                            />*/}
                        <Grid container direction="row" justifyContent="center" alignItems="center" gap={2}>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept=".pdf,.doc,.docx"
                                id="invoice-input"
                                style={{ display: "none" }}
                            />
                            <label htmlFor="invoice-input">
                                <Button sx={{ mb: 4 }} color="primary" component="span" variant="outlined">
                                    Upload Invoice
                                </Button>
                            </label>

                            <Span style={{ display: "inline-flex", verticalAlign: "middle" }}>
                                {uploading ? "Uploading ..." : null}
                                {selectedFile ? selectedFile.name : null}
                            </Span>
                        </Grid>
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
