/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Paper,
    IconButton,
    CircularProgress,
    Typography,
    Button,
    Tooltip,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableFooter,
    TableBody,
    TablePagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
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

function ProductTable() {
    const [products, setProducts] = useState<Product[]>([]);
    const [rows, setRows] = useState<Cell[][]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number
    ) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 500 }} >
                            <TableHead>
                                <Box sx={{display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%'}}>
                                    <Typography variant="h5" component="h5" gutterBottom>
                                        Product List
                                    </Typography>
                                    <Button variant="contained" sx={{marginTop: '1rem'}} onClick={() => window.location.href = '/add'}>
                                        Add Product
                                    </Button>
                                </Box>
                                <TableRow>
                                    {columns.map((header, index) => (
                                        index === 0 ?
                                            <TableCell key={index}>{header}</TableCell>
                                            :
                                            <TableCell key={index} align="right">{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? rows.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    : rows
                                ).map((row, index) => (
                                    <TableRow key={index}>
                                        {row.map((cell, index) =>
                                            index === 0 ? (
                                                <TableCell key={index} component="th" scope="row">
                                                    {cell.value}
                                                </TableCell>
                                            ) : (
                                                <TableCell
                                                    key={index}
                                                    align="right"
                                                    sx={{ width: 100 }}
                                                >
                                                    {cell.value}
                                                </TableCell>
                                            )
                                        )}
                                    </TableRow>
                                ))}
                                {emptyRows > 0 && (
                                    <TableRow style={{ height: 53 * emptyRows }}>
                                        <TableCell colSpan={6} />
                                    </TableRow>
                                )}
                            </TableBody>
                            <TableFooter >
                                <TableRow >
                                    <TablePagination
                                        rowsPerPageOptions={[
                                            5,
                                            10,
                                            25,
                                            { label: "All", value: -1 },
                                        ]}
                                        colSpan={3}
                                        count={rows.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                        sx={{ width: "100%" }}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </TableContainer>
                </Box>
    );
}

export default ProductTable;
