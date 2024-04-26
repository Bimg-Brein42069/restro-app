package com.example.customer.repository;

import com.example.customer.models.OrderRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderRepository extends JpaRepository<OrderRecord,Integer> {
    List<OrderRecord> findByCustId(Integer custId);
}
