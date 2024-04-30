package com.example.reception.repository;

import com.example.reception.models.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepository extends JpaRepository<OrderRecord,Integer> {
    List<OrderRecord> findByCustId(Integer custId);
    List<OrderRecord> findByBillGreaterThan(Integer billamt);
}
