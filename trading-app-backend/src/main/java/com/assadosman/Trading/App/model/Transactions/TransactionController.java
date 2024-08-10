package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.user.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping
    public void addTransaction(@RequestBody Transaction transaction, User user){
        transactionService.buyingTransaction(user,transaction);
    }

    @GetMapping
    public List<Transaction> getTransactions(){
        return  transactionService.getTransactions();
    }

    @DeleteMapping(path="{transactionID}")
    public void removeTransaction(@PathVariable("transactionID") int transactionID){
        transactionService.removeTransaction(transactionID);
    }
}
