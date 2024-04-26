package com.example.reception.service;

import com.example.reception.models.OrderItemMap;

import java.util.List;

public interface OrderItemMapService {
    OrderItemMap createOIM(OrderItemMap oim);
    OrderItemMap updateOIM(OrderItemMap oim);
    void deleteOIM(OrderItemMap oim);
    List<OrderItemMap> findByOrderId(Integer orderId);
    List<OrderItemMap> findByItemId(Integer itemId);
}
