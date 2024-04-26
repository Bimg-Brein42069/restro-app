package com.example.reception.repository;

import com.example.reception.models.OrderItemMap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderItemMapRepository extends JpaRepository<OrderItemMap,Integer> {
    List<OrderItemMap> findByOrderId(Integer orderId);
    List<OrderItemMap> findByItemId(Integer itemId);
}
