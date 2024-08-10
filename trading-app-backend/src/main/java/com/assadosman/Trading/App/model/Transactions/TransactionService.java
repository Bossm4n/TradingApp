package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.user.User;
import com.assadosman.Trading.App.model.user.UserService;

import java.util.List;

public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;

    public TransactionService(TransactionRepository transactionRepository, UserService userService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
    }

    public boolean transactionValid(User user, Double assetCurrentPrice, Double numOfShares){
        // Implement longing and shorts soon
        Double userMoney = user.getBalance();
        Double valueOfTransaction = assetCurrentPrice * numOfShares;

        return userMoney >= valueOfTransaction;
    }

    public void buyingTransaction(User user, Transaction transaction){
        Double assetCurrentPrice = transaction.getAsset().getCurrentPrice();
        Double numOfAssets = transaction.getNumOfAssets();

        if(transactionValid(user, assetCurrentPrice, numOfAssets)) {
            Double newBalance = user.getBalance() - numOfAssets * assetCurrentPrice;

            userService.updateUser(user.getUserID(), null, null, null, newBalance);
            transactionRepository.save(transaction);
        }
        else {
            System.out.println("TRANSACTION FAILED");
        }
    }

    // Write code
    public void sellStock(User user, Transaction transaction){}

    public List<Transaction> getTransactions() {
          return transactionRepository.findAll();
    }

    public void removeTransaction(int transactionID) {
        if(!transactionRepository.existsById(transactionID)){
            throw new IllegalStateException("Invalid transaction ID");
        }

        Transaction transaction = transactionRepository.getReferenceById(transactionID);
        transactionRepository.delete(transaction);
    }
}
