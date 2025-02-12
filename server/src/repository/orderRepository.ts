import { IOrder } from "../model/order";
import Order from "../model/order";

export default class OrderRepository {
    async save(order: IOrder): Promise<IOrder> {
        return await Order.create(order);
    }

    async findById(id: string): Promise<IOrder | null> {
        return await Order.findById(id);
    }

    async destroy(id: string): Promise<void> {
        await Order.findByIdAndDelete(id);
    }


}