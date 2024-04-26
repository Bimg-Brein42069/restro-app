package com.example.reception.service;

import com.example.reception.models.OrderItemMap;
import com.example.reception.repository.OrderItemMapRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderItemMapServiceImpl implements OrderItemMapService{
    @Autowired
    private OrderItemMapRepository OIMRepo;

    public OrderItemMap createOIM(OrderItemMap oim){
        return OIMRepo.save(oim);
    }

    @Override
    public OrderItemMap updateOIM(OrderItemMap oim) {
        Optional<OrderItemMap> eoim=OIMRepo.findById(oim.getId());
        if(eoim.isEmpty())
            return null;
        OrderItemMap exoim=eoim.get();
        exoim.setItemQty(oim.getItemQty());
        return OIMRepo.save(exoim);
    }

    @Override
    public void deleteOIM(OrderItemMap oim) {
        OIMRepo.deleteById(oim.getId());
    }

    @Override
    public List<OrderItemMap> findByOrderId(Integer orderId) {
        return OIMRepo.findByOrderId(orderId);
    }

    @Override
    public List<OrderItemMap> findByItemId(Integer itemId) {
        return OIMRepo.findByItemId(itemId);
    }
}
