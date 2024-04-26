package com.example.reception.service;

import com.example.reception.models.Item;

import java.util.List;
import java.util.Optional;

public interface ItemService {
    Optional<Item> getItemDetails(Integer Id);
    Item createItem(Item item);
    Item updateItem(Item item);
    List<Item> itemFilter(String type1, String type2);
}
