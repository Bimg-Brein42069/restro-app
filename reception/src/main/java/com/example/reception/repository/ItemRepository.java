package com.example.reception.repository;

import com.example.reception.models.Item;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ItemRepository extends JpaRepository<Item,Integer> {
    List<Item> findByType1(String type1);
    List<Item> findByType2(String type2);
    List<Item> findByType1AndType2(String type1,String type2);
}
