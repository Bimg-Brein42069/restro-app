package com.example.customer.service;

import com.example.customer.models.Customer;

import java.util.List;
import java.util.Optional;

public interface CustomerService {
    public Customer saveCustomer(Customer cust);
    public Customer updateCustomer(Customer cust);
    public List<Customer> getAllCustomers();
    public Optional<Customer> getDemographics(Integer id);
}
