package com.example.reception.repository;

import com.example.reception.models.TableStat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TableRepository extends JpaRepository<TableStat,Integer> {
    List<TableStat> findBySeatsGreaterThanEqual(int seats);
}
