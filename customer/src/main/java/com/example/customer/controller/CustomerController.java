package com.example.customer.controller;

import com.example.customer.models.Customer;
import com.example.customer.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/customer")
public class CustomerController {

    @Autowired
    private CustomerService CustServ;

    @GetMapping("/")
    public List<Customer> getAllCustomers(){
        return CustServ.getAllCustomers();
    }
    @PostMapping("/add-customer")
    public Customer addCustomer(@RequestBody Customer cust){
        return CustServ.saveCustomer(cust);
    }

    @GetMapping("/get-customer")
    public Optional<Customer> getDemographics(@RequestParam("id") Integer id){
        return CustServ.getDemographics(id);
    }
}
