package com.assadosman.Trading.App.model.Transactions;

import com.assadosman.Trading.App.model.Assets.AssetEntity;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;

@Entity
@Data
@Table
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionID;

    private Integer userID;
    private AssetEntity asset;
    private Double numOfAssets;
    private LocalDate dateCreated;

    public Transaction(Integer transactionID, Integer userID, AssetEntity asset, Double numOfAssets, LocalDate dateCreated) {
        this.transactionID = transactionID;
        this.userID = userID;
        this.asset = asset;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer userID, AssetEntity asset, Double numOfAssets, LocalDate dateCreated) {
        this.userID = userID;
        this.asset = asset;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Double numOfAssets) {
    }

    public Integer getUserID() {
        return userID;
    }

    public AssetEntity getAsset() {
        return asset;
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
