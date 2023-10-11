export interface Product {
    productId: number;
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: Methodology;
    location?: string;
}

export interface CreateProductProps {
    productName: string;
    productOwnerName: string;
    Developers: string[];
    scrumMasterName: string;
    startDate: string;
    methodology: Methodology;
}

export interface UpdateProductProps {
    productName?: string;
    productOwnerName?: string;
    Developers?: string[];
    scrumMasterName?: string;
    startDate?: string;
    methodology?: Methodology;
    location?: string;
}

export type Methodology = "Agile" | "Waterfall";
