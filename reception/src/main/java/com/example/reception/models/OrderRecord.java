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
public class OrderRecord {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private int custId;
    private int tableNo;
    private double bill;
    private double tax;
}
