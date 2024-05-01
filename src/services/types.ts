
export type TOrderStatus = "created" | "pending" | "done";

export type TOrder = {
    _id : string;
    ingredients: string[];
    status: TOrderStatus;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
    uid?: string ;
};

export type TOrderList = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};