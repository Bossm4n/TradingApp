package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.Assets.AssetEntity;
import com.assadosman.Trading.App.model.Assets.AssetsService;
import com.assadosman.Trading.App.model.user.User;
import com.assadosman.Trading.App.model.user.UserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final AssetsService assetsService;

    public TransactionService(TransactionRepository transactionRepository, UserService userService,
                              AssetsService assetsService) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.assetsService = assetsService;
    }


//    public TransactionService(TransactionRepository transactionRepository) {
//        this.transactionRepository = transactionRepository;
//    }

    public boolean transactionValid(Double userBalance, Double assetCurrentPrice, Double numOfShares){
        // Implement longing and shorts soon
        Double valueOfTransaction = assetCurrentPrice * numOfShares;

        return userBalance >= valueOfTransaction;
    }

    public void buyingTransaction(Transaction transaction){
        Integer userID = transaction.getUserID();

        System.out.println(userID);

        User user = userService.getUserByID(userID);
        Double userBalance = user.getBalance();

        Double assetCurrentPrice = transaction.getAssetPrice();
        Double numOfAssets = transaction.getNumOfAssets();

        if(transactionValid(userBalance, assetCurrentPrice, numOfAssets)) {
            Double newBalance = userBalance - numOfAssets * assetCurrentPrice;

            userService.updateUser(userID, null, null, null, newBalance);
            transactionRepository.save(transaction);
        }
        else {
            System.out.println("TRANSACTION FAILED");
        }
    }

    // Write code
    public void sellAsset(Transaction transaction){
        Integer userID = transaction.getUserID();
        Integer assetID = transaction.getAssetID();

        User user = userService.getUserByID(userID);
        Double userBalance = user.getBalance();

        AssetEntity asset = assetsService.getAssetByID(assetID);
        Double assetCurrentPrice = asset.getCurrentPrice();

        Double numOfAssets = transaction.getNumOfAssets();
        Double saleOfAsset = numOfAssets * assetCurrentPrice;

        if(transactionValid(userBalance, assetCurrentPrice, numOfAssets)) {
            Double newBalance = userBalance - numOfAssets * assetCurrentPrice;

            userService.updateUser(userID, null, null, null, newBalance);
            transactionRepository.save(transaction);
        }
        else {
            System.out.println("SALE FAILED");
        }
    }

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
