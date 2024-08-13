package com.assadosman.Trading.App.model.Transactions;

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
    private String assetISIN;
    // In the future can change it, so we get the price by querying by id and date created
    private Double assetPrice;
    private Double numOfAssets;
    private LocalDate dateCreated;

    public Transaction(){}

    public Transaction(Integer transactionID, Integer userID, String assetISIN, Double assetPrice, Double numOfAssets, LocalDate dateCreated) {
        this.transactionID = transactionID;
        this.userID = userID;
        this.assetISIN = assetISIN;
        this.assetPrice = assetPrice;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer transactionID, Integer userID, String assetISIN, Double numOfAssets, LocalDate dateCreated) {
        this.transactionID = transactionID;
        this.userID = userID;
        this.assetISIN = assetISIN;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer userID, String assetISIN, Double assetPrice, Double numOfAssets, LocalDate dateCreated) {
        this.userID = userID;
        this.assetISIN = assetISIN;
        this.assetPrice = assetPrice;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer userID, String assetISIN, Double numOfAssets, LocalDate dateCreated) {
        this.userID = userID;
        this.assetISIN = assetISIN;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Integer getUserID() {
        return userID;
    }

    public Double getAssetPrice() {
        return assetPrice;
    }

    public void setAssetPrice(Double assetPrice) {
        this.assetPrice = assetPrice;
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
