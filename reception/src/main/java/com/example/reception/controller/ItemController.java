package com.example.reception.controller;

import com.example.reception.models.Item;
import com.example.reception.service.ItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/items")
public class ItemController {
    @Autowired
    private ItemService ItemServ;

    @GetMapping("/get-items")
    public List<Item> getItems(@RequestParam(required = false) String type1,@RequestParam(required = false) String type2){
        return ItemServ.itemFilter(type1,type2);
    }

    @GetMapping("/item-details")
    public Optional<Item> getItemDetails(@RequestParam Integer id){
        return ItemServ.getItemDetails(id);
    }

    @PostMapping("/create-item")
    public Item createItem(@RequestBody Item item){
        return ItemServ.createItem(item);
    }

    @PutMapping("/update-item")
    public Item updateItem(@RequestBody Item item){
        return ItemServ.updateItem(item);
    }
}
