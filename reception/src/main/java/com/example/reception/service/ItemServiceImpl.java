package com.example.reception.service;

import com.example.reception.models.Item;
import com.example.reception.repository.ItemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ItemServiceImpl implements ItemService{
    @Autowired
    private ItemRepository ItemRepo;

    @Override
    public Optional<Item> getItemDetails(Integer id){
        return ItemRepo.findById(id);
    }

    @Override
    public Item createItem(Item item) {
        return ItemRepo.save(item);
    }

    @Override
    public Item updateItem(Item item) {
        if(ItemRepo.findById(item.getId()).isEmpty())
            return null;
        Item currItem=ItemRepo.findById(item.getId()).get();
        currItem.setName(item.getName());
        currItem.setPrice(item.getPrice());
        currItem.setTax(item.getTax());
        currItem.setType1(item.getType1());
        currItem.setType2(item.getType2());
        return ItemRepo.save(currItem);
    }

    @Override
    public List<Item> itemFilter(String type1, String type2){
        if(type1 == null && type2 == null)
            return ItemRepo.findAll();
        if(type1 == null)
            return ItemRepo.findByType2(type2);
        if(type2 == null)
            return ItemRepo.findByType1(type1);
        return ItemRepo.findByType1AndType2(type1,type2);
    }
}
