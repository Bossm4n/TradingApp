package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.Assets.AssetEntity;
import com.assadosman.Trading.App.model.user.User;

public class Transaction {

    Integer transactionID;

    User user;
    AssetEntity asset;
    Double numOfAssets;

    public Transaction(Integer transactionID, User user, AssetEntity asset, Double numOfAssets) {
        this.transactionID = transactionID;
        this.user = user;
        this.asset = asset;
        this.numOfAssets = numOfAssets;
    }

    public Transaction(User user, AssetEntity asset, Double numOfAssets) {
        this.user = user;
        this.asset = asset;
        this.numOfAssets = numOfAssets;
    }

    public Transaction(Double numOfAssets) {
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public AssetEntity getAsset() {
        return asset;
    }

    public void setAsset(AssetEntity asset) {
        this.asset = asset;
    }

    public Double getNumOfAssets() {
        return numOfAssets;
    }

    public void setNumOfAssets(Double numOfAssets) {
        this.numOfAssets = numOfAssets;
    }

    public Integer getTransactionID() {
        return transactionID;
    }
}
