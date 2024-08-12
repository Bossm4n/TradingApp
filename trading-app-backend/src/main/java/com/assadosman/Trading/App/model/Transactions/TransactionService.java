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

    public List<Transaction> findAllByUserID(Integer userID){
        return transactionRepository.findAllByUserID(userID);
    }

    public List<Transaction> findAllByAssetID(Integer assetID){
        return transactionRepository.findAllByAssetID(assetID);
    }

    public List<Transaction> findAllWithUserAndAssetID(Integer userID, Integer assetID){
        return transactionRepository.findAllByUserIDAndAssetID(userID, assetID);
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

        User user = userService.getUserByID(userID);
        Double userBalance = user.getBalance();

        AssetEntity asset = assetsService.getAssetByID(transaction.getAssetID());
        Double assetCurrentPrice = asset.getCurrentPrice();

        Double numOfAssets = transaction.getNumOfAssets();

        if(transactionValid(userBalance, assetCurrentPrice, numOfAssets)) {
            Double costOfAssets = numOfAssets * assetCurrentPrice;

            userService.updateUserBalance(userID, -costOfAssets);
            transaction.setAssetPrice(assetCurrentPrice);
            transactionRepository.save(transaction);
        }
        else {
            throw new IllegalStateException("The user has insufficient funds!");
        }
    }

    // Write code
    public void sellAsset(Transaction transaction){
        Integer userID = transaction.getUserID();
        Integer assetID = transaction.getAssetID();
        // numOfAssets should be negative as we are selling but for ease we make it positive
        Double numOfAssets = -1 * transaction.getNumOfAssets();

        if(!userCanSellAsset(userID, assetID, numOfAssets) || numOfAssets <= 0) {
            throw new IllegalStateException("The user does not have enough of the asset to sell it!");
        }

        AssetEntity asset = assetsService.getAssetByID(assetID);
        Double assetCurrentPrice = asset.getCurrentPrice();

        Double saleOfAsset = assetCurrentPrice * numOfAssets;

        userService.updateUserBalance(userID, saleOfAsset);

        transaction.setAssetPrice(assetCurrentPrice);

        transactionRepository.save(transaction);
    }

    public boolean userCanSellAsset(Integer userID, Integer assetID, Double numOfAssets){
        List<Transaction> transactionsOfAssetByUser = findAllWithUserAndAssetID(userID, assetID);
        Double numOfAssetsOwned = 0d;

        System.out.println("yo");

        for(Transaction transaction: transactionsOfAssetByUser){
            // We get the number of assets bought/sold in each transaction then sum this number up to see how many
            // assets the user currently owns
            numOfAssetsOwned += transaction.getNumOfAssets();
        }
        System.out.println(numOfAssetsOwned);

        return numOfAssetsOwned >= numOfAssets;
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
