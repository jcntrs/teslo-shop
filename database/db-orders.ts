import { isValidObjectId } from "mongoose";
import { db } from ".";
import { IOrder } from "../interfaces";
import { Order } from "../models";

export const getOrderById = async (id: string): Promise<IOrder | null> => {
    if (!isValidObjectId(id)) {
        return null;
    }

    await db.connect();
    const order = await Order.findById({ _id: id }).lean();
    await db.disconnect();

    if (!order) {
        return null;
    }

    // Para serializar
    return JSON.parse(JSON.stringify(order));
}

export const getOrdersByUser = async (userId: string): Promise<IOrder[]> => {
    if (!isValidObjectId(userId)) {
        return [];
    }

    await db.connect();
    const orders = await Order.find({ user:userId }).lean();
    await db.disconnect();

    // Para serializar
    return JSON.parse(JSON.stringify(orders));
}