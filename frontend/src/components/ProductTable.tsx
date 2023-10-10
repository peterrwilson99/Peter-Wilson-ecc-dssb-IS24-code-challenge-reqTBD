/* eslint-disable react-hooks/exhaustive-deps */
import {
    Box,
    Paper,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import MuiExampleTable, { Cell } from "./mui-ex-components/table";
import GitHubIcon from '@mui/icons-material/GitHub';

const ProductsForced = [{"productId":9873,"productName":"Bespoke Frozen Chair","productOwnerName":"Mrs. Dianne Goodwin","Developers":["Tina Goodwin PhD","Mattie Smitham","Holly Cummings","Penny Mayer","Nellie Quitzon"],"scrumMasterName":"Theodore Koelpin","startDate":"2023/1/5","methodology":"Agile","location":"https://github.com/bcgov"},{"productId":8191,"productName":"Ergonomic Soft Pizza","productOwnerName":"Dr. Eva Bednar","Developers":["Derrick Zieme","Janie Leannon V","Guadalupe Haag"],"scrumMasterName":"Gina Yost","startDate":"2023/1/28","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":1305,"productName":"Licensed Plastic Cheese","productOwnerName":"Kenny Bosco III","Developers":["Ruby Kuhlman","Ms. Wanda Dicki","Gladys King"],"scrumMasterName":"Kerry Donnelly","startDate":"2022/11/27","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":855,"productName":"Gorgeous Rubber Sausages","productOwnerName":"Dr. Ben Koss-Hackett","Developers":["Randolph Brakus"],"scrumMasterName":"Roy Gleichner","startDate":"2021/8/20","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":275,"productName":"Licensed Soft Hat","productOwnerName":"Betty Reilly","Developers":["Dr. Shelia Block","Angelina Gutmann Sr.","Jaime Schimmel","Marlene Nicolas","Russell Collins"],"scrumMasterName":"Donna Pacocha","startDate":"2019/1/14","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":5746,"productName":"Handmade Soft Car","productOwnerName":"Willis Aufderhar","Developers":["Frederick Grimes","Hugo Hermiston","Lucas Davis III"],"scrumMasterName":"Blanche Larson","startDate":"2018/3/28","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":1182,"productName":"Generic Fresh Shoes","productOwnerName":"Luther Runolfsson","Developers":["Mrs. Essie Lubowitz"],"scrumMasterName":"Dennis McDermott","startDate":"2017/8/5","methodology":"Agile","location":"https://github.com/bcgov"},{"productId":5074,"productName":"Awesome Steel Keyboard","productOwnerName":"Jerome Rolfson","Developers":["Claire Klein-Aufderhar","Naomi Mayer","Angela Hermann"],"scrumMasterName":"Jill Roberts","startDate":"2014/3/19","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":1095,"productName":"Sleek Granite Chair","productOwnerName":"Kelly Bergnaum","Developers":["Muriel Schuppe","Ms. Sophia Schowalter-Tromp"],"scrumMasterName":"Michele Kuhic","startDate":"2019/0/31","methodology":"Waterfall","location":"https://github.com/bcgov"},{"productId":9397,"productName":"Recycled Granite Chicken","productOwnerName":"Armando Little","Developers":["Jermaine Kihn","Dexter Kuphal III","Elbert Mayer","Wayne Tremblay"],"scrumMasterName":"Mack Schaefer","startDate":"2015/0/5","methodology":"Agile","location":"https://github.com/bcgov"}]

const columns = [
    'Product Number',
    'Product Name',
    'Product Owner',
    'Developers',
    'Scrum Master',
    'Start Date',
    'Methodology',
    'Location'
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
    const [products, setProducts] = useState<Product[]>(ProductsForced as Product[]);
    const [rows, setRows] = useState<Cell[][]>([]);

    const getProducts = async () => {
        try{
            const response = await fetch('/api');
            const data = await response.json();
            if(response.status === 200){
                setProducts(data);
            }else{
                console.error(data);
            }
        }catch(err){
            console.error(err);
        }
    }

    useEffect(() => {
        getProducts();
    }, []);

    useEffect(() => {
        handleProducts();
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
            rowsTemp.push(rowTemp);
        }
        setRows(rowsTemp);
    }

    return (
        rows.length > 0 ?
        <Box sx={{ width: "100%" }}>
            <MuiExampleTable rows={rows} headers={columns} />
        </Box>
        :
        <></>
    );
}

export default ProductTable;
