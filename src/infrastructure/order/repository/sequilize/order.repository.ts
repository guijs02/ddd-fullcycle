import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });

    const orders = orderModels.map((orderModels) => {
      let order = new Order(orderModels.id, orderModels.customer_id,
        orderModels.items.map((item) =>
        new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)));
      return order;
    });

    return orders;
  }

  async update(entity: Order): Promise<void> {
    const result = await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: { id: entity.id },
      }

    );
    
    if(result[0] === 0) {
      throw new Error("Order not found");
    }
  }

  async find(id: string): Promise<Order> {
       let orderModel;
        try {
          orderModel = await OrderModel.findOne({
            where: {
              id,
            },
            rejectOnEmpty: true,
            include: [{ model: OrderItemModel }],
          });
        } catch (error) {
          throw new Error("Order not found");
        }

    return new Order(
      orderModel.id,
      orderModel.customer_id,
      orderModel.items.map(
        (item) =>
          new OrderItem(item.id, item.name, item.price, item.product_id, item.quantity)
      )
    );
  }

  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }
}
