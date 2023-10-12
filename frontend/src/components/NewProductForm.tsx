import React, {useState } from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MultipleTextField from "./MultipleTextField";

function NewProductForm() {
    const [error, setError] = useState(false);
    // fields
    const [productName, setProductName] = useState("");
    const [scrumMaster, setScrumMaster] = useState("");
    const [productOwner, setProductOwner] = useState("");
    const [developers, setDevelopers] = useState<string[]>(['']);
    const [startDate, setStartDate] = useState(dayjs());
    const [methodology, setMethodology] = useState("Agile");

    const postProduct = async () => {
        try{
            const body = {
                productName: productName,
                productOwnerName: productOwner,
                Developers: developers,
                scrumMasterName: scrumMaster,
                startDate: startDate.format("YYYY/MM/DD"),
                methodology: methodology
            };
            const response = await fetch("/api/product", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body)
            });
            if(response.status !== 200 && response.status !== 201){
                setError(true);
                const data = await response.json();
                console.log("Error: " + response.status);
                console.log(data);
                return;
            }else{
                setError(false);
                window.location.href = "/";
            }
        }catch(error){
            setError(true);
            console.log(error);
        }
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postProduct();
    }

    return (
        <form style={{width: '100%'}} onSubmit={handleSubmit}>
            <Typography variant="subtitle1" gutterBottom>
                Product Name - Enter the name of the product.
            </Typography>
            <TextField 
                onChange={(e) => setProductName(e.target.value)}
                id="product-name" 
                label="Product Name" 
                variant="outlined" 
                value={productName}
                sx={{marginY: "1rem"}}
                fullWidth
                required 
            />
            <Typography variant="subtitle1" gutterBottom>
                Scrum Master - Enter the name of the Scrum Master.
            </Typography>
            <TextField 
                onChange={(e) => setScrumMaster(e.target.value)}
                id="scrum-master" 
                label="Scrum Master" 
                variant="outlined" 
                value={scrumMaster}
                sx={{marginY: "1rem"}}
                fullWidth
                required
            />
            <Typography variant="subtitle1" gutterBottom>
                Product Owner - Enter the name of the Product Owner.
            </Typography>
            <TextField 
                onChange={(e) => setProductOwner(e.target.value)}
                id="product-owner" 
                label="Product Owner" 
                variant="outlined" 
                value={productOwner}
                sx={{marginY: "1rem"}}
                fullWidth
                required
            />
            <Typography variant="subtitle1" gutterBottom>
                Developers - Enter the name of the developers, use the plus button to add more developers.
            </Typography>
            <Box sx={{marginY:  "1rem"}}>
                <MultipleTextField
                    value={developers}
                    prompt="Developers"
                    labelSingular="Developer"
                    required={true}
                    variant="outlined"
                    onChange={(values) => setDevelopers(values)}
                    min={1}
                    max={5}
                />
            </Box>
            <Typography variant="subtitle1" gutterBottom>
                Start Date - Enter the start date of the product.
            </Typography>
            <DatePicker
                label="Start Date"
                sx={{width: '100%', marginY: "1rem"}}
                value={startDate}
                onChange={(newValue) => setStartDate(dayjs(newValue))}
                format='YYYY/MM/DD'
                slotProps={{
                    textField: {
                      helperText: 'YYYY/MM/DD',
                    },
                }}
            />
            <Typography variant="subtitle1" gutterBottom>
                Methodology - Select the methodology of the product.
            </Typography>
            <FormControl fullWidth sx={{marginY: "1rem"}}>
                <InputLabel id="methodology-label">Methodology</InputLabel>
                <Select
                    labelId="methodology-label"
                    id="methodology"
                    value={methodology}
                    label="Methodology"
                    onChange={(e) => setMethodology(e.target.value)}
                >
                    <MenuItem value="Agile">Agile</MenuItem>
                    <MenuItem value="Waterfall">Waterfall</MenuItem>
                </Select>
            </FormControl>
            <Box sx={{textAlign: 'right'}}>
                <Button variant="outlined" color="primary" sx={{margin: "1rem", marginRight: 0 }} onClick={() => window.location.href = "/"}>Cancel</Button>
                <Button variant="contained" color="secondary" type="submit" sx={{margin: "1rem", marginRight: 0 }}>Save Product</Button>
            </Box>
            {
                error ?
                    <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={() => setError(false)}
                        title="Error Posting Product"
                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Error saving product. Please try again later
                        </Alert>
                    </Snackbar>
                    :
                    <></>
            }
        </form>
    );
}

export default NewProductForm;
