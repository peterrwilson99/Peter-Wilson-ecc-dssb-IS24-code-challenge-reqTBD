import React, {useState } from "react";
import { FormControl, InputLabel, MenuItem, Paper, Select, TextField } from "@mui/material";

function NewProductForm() {
    const [productName, setProductName] = useState("");
    const [scrumMaster, setScrumMaster] = useState("");
    const [productOwner, setProductOwner] = useState("");
    const [developers, setDevelopers] = useState([]);
    const [startDate, setStartDate] = useState(`${new Date().getFullYear()}/${new Date().getMonth()}/${new Date().getDate()}`);
    const [methodology, setMethodology] = useState("Agile");


    return (
        <form style={{width: '100%'}}>
            <TextField 
                onChange={(e) => setProductName(e.target.value)}
                id="product-name" 
                label="Product Name" 
                variant="outlined" 
                value={productName}
                sx={{margin: "1rem"}}
                fullWidth
                required 
            />
            <TextField 
                onChange={(e) => setScrumMaster(e.target.value)}
                id="scrum-master" 
                label="Scrum Master" 
                variant="outlined" 
                value={scrumMaster}
                sx={{margin: "1rem"}}
                fullWidth
                required
            />
            <TextField 
                onChange={(e) => setProductOwner(e.target.value)}
                id="product-owner" 
                label="Product Owner" 
                variant="outlined" 
                value={productOwner}
                sx={{margin: "1rem"}}
                fullWidth
                required
            />
            {/* Developers here */}
            {/* Start date here */}
            <FormControl fullWidth sx={{margin: "1rem"}}>
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

        </form>
    );
}

export default NewProductForm;
