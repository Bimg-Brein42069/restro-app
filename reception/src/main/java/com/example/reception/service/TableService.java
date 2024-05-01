package com.example.reception.service;

import com.example.reception.models.TableStat;

import java.util.List;
import java.util.Optional;

public interface TableService {
    TableStat addTable(TableStat tbs);
    void deleteTable(TableStat tbs);
    TableStat allocateTable(TableStat tbs);
    TableStat freeTable(TableStat tbs);
    TableStat findTable(int seats);
    Optional<TableStat> findTableByTableNo(int tableNo);
    List<TableStat> getAllTables();
    Integer getMaxSeats();
    TableStat updateTable(TableStat tbs);
}
