import { useRouter } from 'next/router'
import React, { use, useEffect, useState } from 'react'
import EditProductForm, { Product } from '../../src/components/EditProductForm';
import { CircularProgress, Container } from '@mui/material';

function EditProduct() {
    const [product, setProduct] = useState<Product | undefined>(undefined);
    const [error, setError] = useState<boolean>(false);
    const router = useRouter()
    const { productId } = router.query

    const getProduct = async () => {
        try{
            const response = await fetch('/api/'.concat(String(productId)));
            const data = await response.json();
            if(response.status === 200){
                setProduct(data);
            }else{
                console.error(data);
                setError(true);
            }
        }catch(error){
            console.error(error);
            setError(true);
        }
    }

    useEffect(() => {
        if(productId){
            getProduct();
        }
    }, [productId]);

    return (
        <Container>
            {
                product ?
                    <EditProductForm product={product} />
                    :
                    error ?
                        <div>Error</div>
                        :
                        <CircularProgress />

            }
        </Container>
    )
}

export default EditProduct