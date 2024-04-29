package com.example.reception.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TableStat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private boolean av;
    private int tableNo;
    private int seats;
    private int orderNo;
}
