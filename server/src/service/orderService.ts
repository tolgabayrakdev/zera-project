import { IOrder } from "../model/order";
import OrderRepository from "../repository/orderRepository";


export default class OrderService {
    private orderRepository: OrderRepository

    constructor(orderRepository: OrderRepository) {
        this.orderRepository = orderRepository;
    }

    async createOrder(order: IOrder): Promise<IOrder> {
        return await this.orderRepository.save(order);
    }

    async deleteOrder(id: string): Promise<void> {
        await this.orderRepository.destroy(id);
    }

}