package com.example.reception.service;

import com.example.reception.models.TableStat;

public interface TableService {
    TableStat addTable(TableStat tbs);
    void deleteTable(TableStat tbs);
    TableStat allocateTable(TableStat tbs);
    TableStat freeTable(TableStat tbs);
    TableStat findTable(int seats);
}