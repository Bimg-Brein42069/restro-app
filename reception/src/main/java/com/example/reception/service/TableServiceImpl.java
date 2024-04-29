package com.example.reception.service;

import com.example.reception.models.TableStat;
import com.example.reception.repository.TableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

@Service
public class TableServiceImpl implements TableService{
    @Autowired
    private TableRepository TableRepo;


    @Override
    public TableStat addTable(TableStat tbs) {
        return TableRepo.save(tbs);
    }

    @Override
    public void deleteTable(TableStat tbs) {
        TableRepo.deleteById(tbs.getId());
    }

    @Override
    public TableStat allocateTable(TableStat tbs) {
        if(tbs.getSeats() < tbs.getSeats() || !tbs.isAv())
            return null;
        tbs.setAv(false);
        return TableRepo.save(tbs);
    }

    @Override
    public TableStat freeTable(TableStat tbs) {
        Optional<TableStat> etbs=TableRepo.findById(tbs.getId());
        if(etbs.isEmpty())
            return null;
        TableStat ntbs=etbs.get();
        if(ntbs.isAv())
            return null;
        ntbs.setAv(true);
        ntbs.setOrderNo(0);
        return TableRepo.save(ntbs);
    }

    @Override
    public TableStat findTable(int seats) {
        List<TableStat> etbs=TableRepo.findBySeatsGreaterThanEqualAndAvTrue(seats);
        if(etbs.isEmpty())
            return null;
        TableStat ntbs=etbs.get(0);
        return allocateTable(ntbs);
    }

    @Override
    public List<TableStat> getAllTables() {
        return TableRepo.findAll();
    }

    @Override
    public TableStat updateTable(TableStat tbs) {
        Optional<TableStat> etbs=TableRepo.findById(tbs.getId());
        if(etbs.isEmpty())
            return null;
        TableStat ntbs=etbs.get();
        ntbs.setOrderNo(tbs.getOrderNo());
        return TableRepo.save(ntbs);
    }


}
