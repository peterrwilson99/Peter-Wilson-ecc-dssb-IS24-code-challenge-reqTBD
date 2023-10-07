import { products } from "..";

const maxValue = 1000000

const randomBigInt = () => Math.floor(Math.random() * maxValue);
 

export function generateId(): number {
    const ids = products.map(product => product.productId);
    let i = 0;
    while(i < maxValue) {
        const newId = randomBigInt();
        if (!ids.includes(newId)) {
            return newId;
        }
        i++;
    }
    throw new Error("Unable to generate a unique ID");
}