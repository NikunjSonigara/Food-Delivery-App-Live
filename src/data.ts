export interface PostData{
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    popular: boolean;
    food_type: string;
    time: string;
}

export interface CartData{
    id: string;
    name: string;
    description: string;
    image: string;
    price: string;
    quantity: number;
    popular: boolean;
    food_type: string;
    time: string;
}

export interface CoupanCode{
    [code: string]: number;
}

export interface Menu{
    menu_id: number;
    menu_name: string;
    menu_image: string;
}

export interface FoodArray{
    title: string;
    food_items: PostData[];
}

export interface TopBrandsData{
    id: number;
    name: string; 
    image: string;
    description: string;
    address: string;
    time: string;
    average_cost: string;
    location: string;
    menu: Menu[];
    food: FoodArray[];
}

export interface MenuSec2Data{
    id: number;
    name: string;
    image: string;
    time: string;
}

export interface MenuSec3Data{
    id: number;
    title: string;
    description: string;
    image: string;
}

export interface HomePopulerListData{
    id: number;
    name: string;
    time: string;
    description: string;
    price: string;
    popular: boolean;
    shopping: boolean;
    image: string;
}