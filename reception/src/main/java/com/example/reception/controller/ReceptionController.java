package com.example.reception.controller;

import com.example.reception.models.OrderItemMap;
import com.example.reception.models.TableStat;
import com.example.reception.service.OrderService;
import com.example.reception.models.Item;
import com.example.reception.models.OrderRecord;
import com.example.reception.service.ItemService;
import com.example.reception.service.OrderItemMapService;
import com.example.reception.service.TableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin
@RequestMapping("/reception")
public class ReceptionController {
    @Autowired
    private ItemService ItemServ;

    @GetMapping("/get-items")
    List<Item> getItems(@RequestParam(required = false) String type1,@RequestParam(required = false) String type2){
        return ItemServ.itemFilter(type1,type2);
    }

    @GetMapping("/item-details")
    Optional<Item> getItemDetails(@RequestParam Integer id){
        return ItemServ.getItemDetails(id);
    }

    @PostMapping("/create-item")
    Item createItem(@RequestBody Item item){
        return ItemServ.createItem(item);
    }

    @PutMapping("/update-item")
    Item updateItem(@RequestBody Item item){
        return ItemServ.updateItem(item);
    }

    @Autowired
    private OrderService OrdServ;

    @GetMapping("/orders")
    List<OrderRecord> getOrderByCustId(@RequestParam(required = false) Integer custId){
        if(custId == null)
            return OrdServ.getAllOrders();
        return OrdServ.getOrderByCustId(custId);
    }

    @GetMapping("/order-info")
    Optional<OrderRecord> getOrderInfo(@RequestParam Integer id){
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

    @DeleteMapping("/delete-order")
    void deleteOrder(@RequestBody OrderRecord ord){
        OrdServ.deleteOrder(ord);
    }

    @Autowired
    private OrderItemMapService OIMServ;

    @GetMapping("/order-items")
    List<OrderItemMap> getOrderItems(@RequestParam Integer orderId){
        return OIMServ.findByOrderId(orderId);
    }

    @GetMapping("/item-orders")
    List<OrderItemMap> getItemOrders(@RequestParam Integer itemId){
        return OIMServ.findByItemId(itemId);
    }

    @PostMapping("/add-item-to-order")
    OrderItemMap addItemToOrder(@RequestBody OrderItemMap oim){
        Optional<OrderItemMap> eoim=OIMServ.findByOrderIdAndItemId(oim.getOrderId(),oim.getItemId());
        if(eoim.isPresent()){
            OrderItemMap noim=eoim.get();
            noim.setItemQty(noim.getItemQty()+oim.getItemQty());
            return OIMServ.updateOIM(noim);
        }
        return OIMServ.createOIM(oim);
    }

    @PutMapping("/bill-order")
    OrderRecord billOrder(@RequestBody OrderRecord ord){
        if(ord.getBill() != -1)
            return null;
        List<OrderItemMap> oimmp=OIMServ.findByOrderId(ord.getId());
        double price = 0.0, tax= 0.0;
        for (OrderItemMap orderItemMap : oimmp) {
            int qty = orderItemMap.getItemQty();
            Item item = ItemServ.getItemDetails(orderItemMap.getItemId()).get();
            price += item.getPrice() * qty;
            tax += item.getTax() * qty;
        }
        ord.setBill(price);
        ord.setTax(tax);
        return ord;
    }

    @PutMapping("/update-item-of-order")
    OrderItemMap updateItemOfOrder(@RequestBody OrderItemMap oim){
        return OIMServ.updateOIM(oim);
    }

    @DeleteMapping("/delete-item-from-order")
    void deleteItemfromOrder(@RequestBody OrderItemMap oim){
        OIMServ.deleteOIM(oim);
    }

    @Autowired
    private TableService TableServ;

    @PostMapping("/add-table")
    TableStat addTable(@RequestBody TableStat tbs){
        return TableServ.addTable(tbs);
    }

    @DeleteMapping("/delete-table")
    void deleteTable(@RequestBody TableStat tbs){
        TableServ.deleteTable(tbs);
    }

    @PutMapping("/book-table")
    TableStat bookTable(@RequestBody TableStat tbs){
        return TableServ.findTable(tbs.getSeats());
    }

    @PutMapping("/unbook-table")
    TableStat unbookTable(@RequestBody TableStat tbs){
        return TableServ.freeTable(tbs);
    }

}
