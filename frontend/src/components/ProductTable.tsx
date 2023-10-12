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
    InputAdornment,
    TableFooter,
    TableBody,
    TablePagination,
    List,
    TextField,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import GitHubIcon from '@mui/icons-material/GitHub';
import SearchIcon from '@mui/icons-material/Search';

const columns = [
    'Product Name',
    'Number',
    'Owner',
    'Developers',
    'Scrum Master',
    'Start Date',
    'Methodology',
    'Location',
    'Edit'
]

const searchCategoriesMap = {
    'productName': 'Product Name',
    'productId': 'Number',
    'productOwnerName': 'Owner',
    'Developers': 'Developers',
    'scrumMasterName': 'Scrum Master',
}

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
    const [productsRaw, setProductsRaw] = useState<Product[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState<string>('');
    const [searchCategory, setSearchCategory] = useState<string>(Object.keys(searchCategoriesMap)[0]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

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
        setLoading(true);
        try{
            const response = await fetch('/api/product');
            const data = await response.json();
            if(response.status === 200){
                setProductsRaw(data);
                setError(false);
            }else{
                console.error(data);
                setError(true);
            }
        }catch(err){
            console.error(err);
            setError(true);
        }
        setLoading(false);
    }

    const handleSearch = () => {
        if(search === ''){
            setProducts(productsRaw);
        }else{
            setProducts(productsRaw.filter((product) => {
                if(searchCategory === 'Developers'){
                    return product[searchCategory].some((developer: string) => developer.toLowerCase().includes(search.toLowerCase()));
                }else{
                    return String(product[searchCategory]).toLowerCase().includes(search.toLowerCase());
                }
            }));
        }
    }

    useEffect(() => {
        getProducts();
    }, []);
    
    useEffect(() => {
        setPage(0);
        handleSearch();
    }, [search, searchCategory]);
    
    useEffect(() => {
        setLoading(true);
        setProducts(productsRaw);
        setLoading(false);
    }, [productsRaw])

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
                <Paper elevation={7} sx={{ width: "100%", borderRadius: 5, paddingY: '2rem', paddingX: '15px' }}>
                    <Box sx={{display: 'flex', flexDirection: "row", justifyContent: 'space-between', width: '100%', paddingX: '1.5rem', height: '100%'}}>
                        <Box sx={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', width: '100%', paddingX: '1.5rem', minHeight: 120}}>
                            <Typography variant="h5" component="h5" gutterBottom >
                                View Products
                            </Typography>
                            <Box >
                                <TextField
                                    label="Search"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <SearchIcon />
                                        </InputAdornment>
                                    ),
                                    }}
                                    sx={{maxWidth: '180px'}}
                                    variant="standard"
                                />
                                <FormControl variant="standard" sx={{minWidth: 120}}>
                                    <InputLabel id="search-category-label">Category</InputLabel>
                                    <Select
                                        labelId="search-category-label"
                                        id="search-category"
                                        value={searchCategory}
                                        variant="standard"
                                        onChange={(e) => setSearchCategory(e.target.value as string)}
                                    >
                                        {Object.keys(searchCategoriesMap).map((category, index) => (
                                            <MenuItem key={index} value={category}>
                                                {searchCategoriesMap[category as keyof typeof searchCategoriesMap]}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                        </Box>
                        <Box sx={{display: 'flex', flexDirection: "column", justifyContent: 'space-between', width: '100%', paddingX: '1.5rem', height: '100%', textAlign: 'right', minHeight: 120}}>
                            <Box >
                                <Button variant="outlined" href="/add" endIcon={<AddIcon />}>
                                    Add Product
                                </Button>
                            </Box>
                            <Typography variant="subtitle2" component="p" gutterBottom>
                                {products.length} Products
                            </Typography>
                           
                        
                        </Box>
                    </Box>
                    
                    <TableContainer sx={{marginY: '1rem'}}>
                        <Table stickyHeader>
                            <TableHead>
                                <TableRow>
                                    {columns.map((header, index) => (
                                        index === 0 ?
                                            <TableCell key={index} sx={{fontSize: '1.1rem'}}>{header}</TableCell>
                                            :
                                            <TableCell key={index} align="right" sx={{fontSize: '1.1rem'}}>{header}</TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {(rowsPerPage > 0
                                    ? products.slice(
                                        page * rowsPerPage,
                                        page * rowsPerPage + rowsPerPage
                                    )
                                    : products
                                ).map((product, index) => (
                                    <TableRow key={index}>
                                        <TableCell>
                                            <Typography variant="body1">{product.productName}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.productId}
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.productOwnerName}
                                        </TableCell>
                                        <TableCell align="right">
                                            <List dense={true} sx={{textAlign: 'right'}}>
                                                {product.Developers.map((developer, index) => (
                                                    <ListItem key={index} sx={{textAlign: 'right', p: 0}}>
                                                        <ListItemText primary={developer} />
                                                    </ListItem>
                                                ))}
                                            </List>
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.scrumMasterName}
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.startDate}
                                        </TableCell>
                                        <TableCell align="right">
                                            {product.methodology}
                                        </TableCell>
                                        <TableCell align="right">
                                            {
                                                !product.location || product.location === '' ?
                                                    <IconButton href={product.location ?? "#"} disabled={true} target="_blank" size="large" sx={{textAlign: 'right', p: 0,}}>
                                                        <GitHubIcon />
                                                    </IconButton>
                                                    :
                                                    <Tooltip title={product.location && product.location !== '' ? "View GitHub": "No Repository Found"}>
                                                        <IconButton href={product.location ?? "#"} disabled={false} target="_blank" size="large" sx={{textAlign: 'right', p: 0,}}>
                                                            <GitHubIcon />
                                                        </IconButton>
                                                    </Tooltip>

                                            }
                                        </TableCell>
                                        <TableCell align="right">
                                            <Button href={"/edit/".concat(String(product.productId))} variant="outlined" color="secondary" endIcon={<EditIcon />}>
                                                Edit
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[
                            5,
                            10,
                            25,
                            { label: "All", value: -1 },
                        ]}
                        component="div"
                        count={products.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
    );
}

export default ProductTable;
