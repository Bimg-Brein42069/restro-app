package com.example.customer.service;

import com.example.customer.models.OrderRecord;

import java.util.List;
import java.util.Optional;

public interface OrderService {
    List<OrderRecord> getOrderByCustId(Integer custId);
    List<OrderRecord> getAllOrders();
    Optional<OrderRecord> viewDetails(Integer id);
    OrderRecord createOrder(OrderRecord ord);
    OrderRecord updateOrder(OrderRecord ord);
}
