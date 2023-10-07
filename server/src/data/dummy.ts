import { faker } from '@faker-js/faker';
import { Product } from '../types/Product';

export function createRandomProduct(): Product {
    const developers = []
    const numDevelopers = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < numDevelopers; i++) {
        developers.push(faker.person.fullName());
    }
    const date = faker.date.past({ years: 10 })
    const startDate = `${date.getFullYear()}/${date.getMonth()}/${date.getDate()}`
    
    return {
        productId: faker.number.int(),
        productName: faker.commerce.productName(),
        productOwnerName: faker.person.fullName(),
        Developers: developers,
        scrumMasterName: faker.person.fullName(),
        startDate,
        methodology: faker.helpers.arrayElement(['Agile', 'Waterfall']),
        location: "https://github.com/bcgov"
    };
}

export function createProductArray(products?: number): Product[] {
    const productArray: Product[] = [];
    const numProducts = products || faker.number.int({ min: 1, max: 10 });
    for (let i = 0; i < numProducts; i++) {
        productArray.push(createRandomProduct());
    }
    return productArray;
}

