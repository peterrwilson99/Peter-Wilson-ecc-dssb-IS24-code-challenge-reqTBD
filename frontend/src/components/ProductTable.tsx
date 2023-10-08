import { Box, Paper, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'

const Columns = [
    'Product Number',
    'Product Name',
    'Scrum Master',
    'Product Owner',
    'Development Team',
    'Start Date',
    'Methodology',
    'Location',
]

function ProductTable() {
  return (
    <Box sx={{width: '100%'}}>
        <TableContainer component={Paper}>
            <TableHead>
                <TableRow>
                    {Columns.map((column) => (
                        <TableCell key={column}>{column}</TableCell>
                    ))}
                </TableRow>
            </TableHead>
        </TableContainer>    
    </Box>
  )
}

export default ProductTable