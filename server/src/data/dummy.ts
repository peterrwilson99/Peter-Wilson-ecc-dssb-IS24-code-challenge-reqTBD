import { faker } from '@faker-js/faker';
import { Product } from '../types/Product';
import { maxValue } from '../utils/generateId';
import { govProjects } from './products';

interface BaseProject { 
    productName: string;
    location: string;
    Developers: string[];
    startDate: string;
}

export function createRandomProduct(project: BaseProject): Product {
    
    return {
        productId: faker.number.int({min: 1, max: maxValue}),
        productName: project.productName,
        productOwnerName: faker.person.fullName(),
        Developers: project.Developers,
        scrumMasterName: faker.person.fullName(),
        startDate: project.startDate,
        methodology: faker.helpers.arrayElement(['Agile', 'Waterfall']),
        location: project.location
    };
}

export function createProductArray(products?: number): Product[] {
    const productArray: Product[] = [];
    
    const numProducts = Math.min(products || 10, govProjects.length, 40);
    const baseProjects: BaseProject[] = faker.helpers.arrayElements(govProjects, numProducts);
    for (const project of baseProjects) {
        productArray.push(createRandomProduct(project));
    }
    return productArray;
}

