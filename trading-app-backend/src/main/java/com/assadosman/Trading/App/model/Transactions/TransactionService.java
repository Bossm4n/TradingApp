package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.Assets.AssetEntity;
import com.assadosman.Trading.App.model.Assets.AssetRepo;
import com.assadosman.Trading.App.model.Assets.AssetsService;
import com.assadosman.Trading.App.model.user.User;
import com.assadosman.Trading.App.model.user.UserService;
import com.fasterxml.jackson.core.JsonProcessingException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TransactionService {
    private final TransactionRepository transactionRepository;
    private final UserService userService;
    private final AssetsService assetsService;
    public AssetRepo assetRepo;

    public TransactionService(TransactionRepository transactionRepository, UserService userService,
                              AssetsService assetsService, AssetRepo assetRepo) {
        this.transactionRepository = transactionRepository;
        this.userService = userService;
        this.assetsService = assetsService;
        this.assetRepo = assetRepo;
    }

    public List<Transaction> findAllByUserID(Integer userID){
        return transactionRepository.findAllByUserID(userID);
    }

    public List<Transaction> findAllByAssetName(String assetName){
        return transactionRepository.findAllByAssetName(assetName);
    }

    public List<Transaction> findAllByUserIDAndAssetName(Integer userID, String assetName){
        return transactionRepository.findAllByUserIDAndAssetName(userID, assetName);
    }

    public boolean transactionValid(Double userBalance, Double assetCurrentPrice, Double numOfShares){
        // Implement longing and shorts soon
        Double valueOfTransaction = assetCurrentPrice * numOfShares;

        return userBalance >= valueOfTransaction;
    }

    public void buyingTransaction(Transaction transaction) throws JsonProcessingException, AssetDoesntExistException {
        Integer userID = transaction.getUserID();

        User user = userService.getUserByID(userID);
        Double userBalance = user.getBalance();


        Optional<AssetEntity> assetOptional = assetRepo.findById(transaction.getAssetName());
        if (assetOptional.isEmpty()){
            throw new AssetDoesntExistException();
        }
        AssetEntity asset = assetOptional.get();
        Double assetCurrentPrice = this.assetsService.getCurrentPrice(asset.getName());

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
    public void sellAsset(Transaction transaction) throws AssetDoesntExistException, JsonProcessingException {
        Integer userID = transaction.getUserID();
        String assetISIN = transaction.getAssetName();
        // numOfAssets should be negative as we are selling but for ease we make it positive
        Double numOfAssets = -1 * transaction.getNumOfAssets();

        if(!userCanSellAsset(userID, assetISIN, numOfAssets) || numOfAssets <= 0) {
            throw new IllegalStateException("The user does not have enough of the asset to sell it!");
        }

        Optional<AssetEntity> assetOptional = assetRepo.findById(transaction.getAssetName());
        if (! assetOptional.isPresent()){
            throw new AssetDoesntExistException();
        }
        AssetEntity asset = assetOptional.get();
        Double assetCurrentPrice = this.assetsService.getCurrentPrice(asset.getName());

        Double saleOfAsset = assetCurrentPrice * numOfAssets;

        userService.updateUserBalance(userID, saleOfAsset);

        transaction.setAssetPrice(assetCurrentPrice);

        transactionRepository.save(transaction);
    }

    public boolean userCanSellAsset(Integer userID, String assetISIN, Double numOfAssets){
        List<Transaction> transactionsOfAssetByUser = findAllByUserIDAndAssetName(userID, assetISIN);
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

    public class AssetDoesntExistException extends Exception{
        public AssetDoesntExistException() {
            super();
        }
    }
}
