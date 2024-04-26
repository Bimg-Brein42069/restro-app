package com.example.customer.controller;

import com.example.customer.models.OrderRecord;
import com.example.customer.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/order")
public class OrderController {
    @Autowired
    private OrderService OrdServ;

    @GetMapping("/all-orders")
    List<OrderRecord> getAllOrders(){
        return OrdServ.getAllOrders();
    }

    @GetMapping("/orders")
    List<OrderRecord> getOrderByCustId(@RequestParam Integer custId){
        return OrdServ.getOrderByCustId(custId);
    }

    @GetMapping("/order-details")
    Optional<OrderRecord> getOrderDetails(@RequestParam Integer id){
        return OrdServ.viewDetails(id);
    }

    @PostMapping("/add-order")
    OrderRecord createOrder(@RequestBody OrderRecord ord){
        return OrdServ.createOrder(ord);
    }

    @PutMapping("/update-order")
    OrderRecord updateOrder(@RequestBody OrderRecord ord){
        return OrdServ.updateOrder(ord);
    }
}
