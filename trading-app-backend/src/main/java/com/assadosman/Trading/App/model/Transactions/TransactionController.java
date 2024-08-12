package com.assadosman.Trading.App.model.Transactions;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/buy")
    public ResponseEntity<String> addBuyingTransaction(@Valid @RequestBody Transaction transaction){
        if(transaction.getNumOfAssets()<=0){
            return new ResponseEntity<>("Invalid Number of assets", HttpStatus.BAD_REQUEST);
        }

        transactionService.buyingTransaction(transaction);

        return new ResponseEntity<>("Successfully bought your asset('s)", HttpStatus.OK);
    }

    @GetMapping
    public List<Transaction> getTransactions(){
        return transactionService.getTransactions();
    }

    @PostMapping("/sell")
    public ResponseEntity<String> addSellingTransaction(@Valid @RequestBody Transaction transaction){
        transactionService.sellAsset(transaction);

        return new ResponseEntity<>("Successfully sold your asset('s)", HttpStatus.OK);
    }


    @DeleteMapping(path="{transactionID}")
    public void removeTransaction(@PathVariable("transactionID") int transactionID){
        transactionService.removeTransaction(transactionID);
    }
}
