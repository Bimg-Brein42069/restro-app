package com.example.customer.service;

import com.example.customer.models.Customer;
import com.example.customer.repository.CustomerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CustomerServiceImpl implements CustomerService{
    @Autowired
    private CustomerRepository CustRepo;

    @Override
    public Customer saveCustomer(Customer cust){
        return CustRepo.save(cust);
    }

    @Override
    public Customer updateCustomer(Customer cust) {
        Optional<Customer> ec=CustRepo.findById(cust.getId());
        if(ec.isEmpty())
            return null;
        Customer nc=ec.get();
        nc.setName(cust.getName());
        nc.setLoyalpoints(cust.getLoyalpoints());
        return CustRepo.save(nc);
    }

    @Override
    public List<Customer> getAllCustomers(){
        return CustRepo.findAll();
    }

    @Override
    public Optional<Customer> getDemographics(Integer id){
        return CustRepo.findById(id);
    }
}
