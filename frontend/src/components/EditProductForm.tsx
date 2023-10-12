import React, { useState, useEffect } from "react";
import { Alert, Box, Button, FormControl, InputLabel, MenuItem, Paper, Select, Snackbar, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import MultipleTextField from "./MultipleTextField";

interface EditProductFormProps {
    product: Product;
}

export interface Product {
    productId: number;
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: string;
    location?: string;
}

function EditProductForm(props: EditProductFormProps) {
    const { product } = props;
    const [error, setError] = useState(false);
    // fields
    const [productName, setProductName] = useState(product.productName ?? "");
    const [scrumMaster, setScrumMaster] = useState(product.scrumMasterName ?? "");
    const [productOwner, setProductOwner] = useState(product.productOwnerName ?? "");
    const [developers, setDevelopers] = useState<string[]>(product.Developers ?? ['']);
    const [startDate, setStartDate] = useState(dayjs(product.startDate) ?? dayjs());
    const [methodology, setMethodology] = useState(product.methodology ?? "Agile");
    const [location, setLocation] = useState(product.location ?? "");
    const [changesMade, setChangesMade] = useState(false)

    // PUT request to update product
    const putProduct = async () => {
        try{
            const body = {
                productName: productName,
                productOwnerName: productOwner,
                Developers: developers,
                scrumMasterName: scrumMaster,
                startDate: startDate.format("YYYY/MM/DD"),
                methodology: methodology,
                location: location
            };
            const response = await fetch("/api/product/".concat(String(product.productId)), {
                method: "PUT",
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
        putProduct();
    }

    // check to see if any changes have been made to the form
    const checkChangesMade = () => {
        if(productName !== product.productName){
            setChangesMade(true);
            console.log("productName changed")
            return;
        }
        if(scrumMaster !== product.scrumMasterName){
            setChangesMade(true);
            console.log("scrumMaster changed")
            return;
        }
        if(productOwner !== product.productOwnerName){
            setChangesMade(true);
            console.log("productOwner changed")
            return;
        }
        if(developers !== product.Developers){
            setChangesMade(true);
            console.log("developers changed")
            return;
        }
        if(startDate.format("YYYY/MM/DD") !== dayjs(product.startDate).format("YYYY/MM/DD")){
            setChangesMade(true);
            console.log("startDate changed")
            return;
        }
        if(methodology !== product.methodology){
            setChangesMade(true);
            console.log("methodology changed")
            return;
        }
        if(location !== product.location){
            setChangesMade(true);
            console.log("location changed")
            return;
        }
        setChangesMade(false);
    }

    // check for changes made to the form
    useEffect(() => {
        checkChangesMade();
    }, [productName, productOwner, developers, scrumMaster, startDate, methodology, location])

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
            <Typography variant="subtitle1" gutterBottom>
                Location - Enter the GitHub Repository URL.
            </Typography>
            <TextField 
                onChange={(e) => setLocation(e.target.value)}
                id="location" 
                label="Location" 
                variant="outlined"
                value={location}
                sx={{marginY: "1rem"}}
                fullWidth
            />
            <Box sx={{textAlign: 'right'}}>
                <Button variant="outlined" color="primary" onClick={() => window.location.href = "/"} sx={{margin: "1rem",  marginRight: 0}}>Cancel</Button>
                <Button variant="contained" color="secondary" type="submit" disabled={!changesMade} sx={{margin: "1rem", marginRight: 0}}>Save Changes</Button>
            </Box>
            {
                error ?
                    <Snackbar
                        open={error}
                        autoHideDuration={6000}
                        onClose={() => setError(false)}
                        title="Error Editing Product"
                    >
                        <Alert severity="error" sx={{ width: '100%' }}>
                            Error saving product. Please try again.
                        </Alert>
                    </Snackbar>
                    :
                    <></>
            }
        </form>
    );
}

export default EditProductForm;
