package com.assadosman.Trading.App.model.Transactions;

import com.fasterxml.jackson.core.JsonProcessingException;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://16.171.124.214:3000")
@RequestMapping(path="api/transaction")
public class TransactionController {
    private final TransactionService transactionService;

    @Autowired
    public TransactionController(TransactionService transactionService) {
        this.transactionService = transactionService;
    }

    @PostMapping("buy")
    public ResponseEntity<String> addBuyingTransaction(@Valid @RequestBody Transaction transaction) throws JsonProcessingException, TransactionService.AssetDoesntExistException {
        if(transaction.getNumOfAssets()<=0){
            return new ResponseEntity<>("Invalid Number of assets", HttpStatus.BAD_REQUEST);
        }

        transactionService.buyingTransaction(transaction);
        System.out.println(transaction.getAssetName());
        System.out.println(transaction.getNumOfAssets());

        return new ResponseEntity<>("Successfully bought your asset('s)", HttpStatus.OK);
    }

    @GetMapping
    public List<Transaction> getTransactions(){
        return transactionService.getTransactions();
    }

    @GetMapping(path = "{userID}")
    public List<Transaction> getUsersTransactions(@PathVariable("userID") Integer userID){
        return transactionService.findAllByUserID(userID);
    }

    @PostMapping("sell")
    public ResponseEntity<String> addSellingTransaction(@Valid @RequestBody Transaction transaction) throws JsonProcessingException, TransactionService.AssetDoesntExistException {
        transactionService.sellAsset(transaction);

        return new ResponseEntity<>("Successfully sold your asset('s)", HttpStatus.OK);
    }


    @DeleteMapping(path="{transactionID}")
    public void removeTransaction(@PathVariable("transactionID") int transactionID){
        transactionService.removeTransaction(transactionID);
    }
}
