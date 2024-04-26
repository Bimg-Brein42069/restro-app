package com.example.reception.service;

import com.example.reception.models.OrderItemMap;

import java.util.List;
import java.util.Optional;

public interface OrderItemMapService {
    OrderItemMap createOIM(OrderItemMap oim);
    OrderItemMap updateOIM(OrderItemMap oim);
    void deleteOIM(OrderItemMap oim);
    List<OrderItemMap> findByOrderId(Integer orderId);
    List<OrderItemMap> findByItemId(Integer itemId);
    Optional<OrderItemMap> findById(Integer id);
    Optional<OrderItemMap> findByOrderIdAndItemId(Integer orderId,Integer itemId);
}
