import { IOrder } from "../model/order";
import Order from "../model/order";

export default class OrderRepository {
    async save(order: IOrder): Promise<IOrder> {
        return await Order.create(order);
    }

    async findById(id: string, userId: string): Promise<IOrder | null> {
        return await Order.findOne({ _id: id, userId });
    }

    async findAllByUser(userId: string): Promise<IOrder[]> {
        return await Order.find({ userId }); 
    }

    async destroy(id: string, userId: string): Promise<void> {
        await Order.findOneAndDelete({ _id: id, userId });
    }
}
