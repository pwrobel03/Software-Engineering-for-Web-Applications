import Order from "../models/Order.js";

export function AddOrderRepository(Base) {
    return class extends Base {
        async createOrder(orderData) {
            return Order.create(orderData);
        }

        async getOrdersByUserId(userId) {
            return Order.findAll({
                where: { userId },
            });
        }

        async getOrderById(id) {
            return Order.findByPk(id);
        }

        // Aktualizacja zamówienia (np. zmiana ilości)
        async updateOrder(id, updateData) {
            const order = await this.getOrderById(id);
            if (!order) return null;

            await order.update(updateData);
            return order;
        }

        // Usuwanie zamówienia
        async deleteOrder(id) {
            return Order.destroy({
                where: { id },
            });
        }
    };
}
