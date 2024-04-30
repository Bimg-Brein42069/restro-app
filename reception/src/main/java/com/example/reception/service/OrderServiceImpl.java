package com.example.reception.service;

import com.example.reception.repository.OrderRepository;
import com.example.reception.models.OrderRecord;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository OrderRepo;

    @Override
    public List<OrderRecord> getOrderByCustId(Integer custId){
        return OrderRepo.findByCustId(custId);
    }

    @Override
    public List<OrderRecord> getAllOrders(){
        return OrderRepo.findByBillGreaterThan(0);
    }

    @Override
    public OrderRecord createOrder(OrderRecord ord){
        return OrderRepo.save(ord);
    }



    @Override
    public OrderRecord updateOrder(OrderRecord ord){
        if(OrderRepo.findById(ord.getId()).isEmpty())
            return null;
        OrderRecord orgOrderRecord = OrderRepo.findById(ord.getId()).get();
        orgOrderRecord.setBill(ord.getBill());
        orgOrderRecord.setTax(ord.getTax());
        return OrderRepo.save(orgOrderRecord);
    }

    @Override
    public Optional<OrderRecord> viewDetails(Integer id){
        return OrderRepo.findById(id);
    }

    @Override
    public void deleteOrder(OrderRecord ord) {
        OrderRepo.deleteById(ord.getId());
    }
}
