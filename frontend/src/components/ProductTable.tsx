/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Paper,
    IconButton,
    CircularProgress,
    Typography,
    Button,
    Tooltip,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import MuiExampleTable, { Cell } from "./mui-ex-components/table";
import GitHubIcon from '@mui/icons-material/GitHub';

const columns = [
    'Product Number',
    'Product Name',
    'Product Owner',
    'Developers',
    'Scrum Master',
    'Start Date',
    'Methodology',
    'Location',
    'Edit'
]

interface Product {
    productId: number;
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: string;
    location?: string;
    [key: string]: any;
}

const TableHeader = () => {
    return(
        <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%'}}>
            <Typography variant="h5" component="h5" gutterBottom>
                Product List
            </Typography>
            <Button variant="contained" sx={{marginTop: '1rem'}} onClick={() => window.location.href = '/add'}>
                Add Product
            </Button>
        </Box>
    )
}

function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [rows, setRows] = useState<Cell[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const getProducts = async () => {
        try{
            const response = await fetch('/api');
            const data = await response.json();
            if(response.status === 200){
                setProducts(data);
                setError(false);
            }else{
                console.error(data);
                setError(true);
            }
        }catch(err){
            console.error(err);
            setError(true);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        setLoading(true);
        handleProducts();
        setLoading(false);
    }, [products]);

    const handleProducts = () => {
        const rowsTemp = [];
        for(const product of products){
            const rowTemp: Cell[] = []
            for (const property in product) {
                let val = product[property];
                if(property === 'location'){
                    val = <IconButton href={val} target="_blank" size="large"><GitHubIcon /></IconButton>
                }else if(property === 'Developers'){
                    val = val.join(', ');
                }
                rowTemp.push({
                    "key": property,
                    "value": val
                });
            }
            rowTemp.push({
                "key": "Edit",
                "value": <Tooltip title="Edit Product">
                    <IconButton href={"/edit/".concat(String(product.productId))} size="large"><EditIcon /></IconButton>
                </Tooltip>
            });
            rowsTemp.push(rowTemp);
        }
        setRows(rowsTemp);
    }

    return (
        loading ?
            <CircularProgress />
            :
            error ? 
                <Paper elevation={7} sx={{borderRadius: 5, textAlign: 'center', padding: '2rem'}}>
                    <Typography variant="h5" component="h5" gutterBottom>
                        Something went wrong...
                    </Typography>
                    <Button variant="contained" sx={{marginTop: '1rem'}} onClick={() => getProducts()}>
                        Try Again
                    </Button>
                </Paper>
                :
                <Box sx={{ width: "100%" }}>
                    <MuiExampleTable rows={rows} columns={columns} header={<TableHeader />} />
                </Box>
    );
}

export default ProductTable;
