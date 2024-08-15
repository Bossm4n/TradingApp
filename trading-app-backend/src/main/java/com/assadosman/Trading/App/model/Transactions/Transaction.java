package com.assadosman.Trading.App.model.Transactions;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Entity
@Data
@Table
@AllArgsConstructor
@Builder
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer transactionID;

    private Integer userID;
    private String assetName;
    // In the future can change it, so we get the price by querying by id and date created
    private Double assetPrice;
    private Double numOfAssets;
    private LocalDate dateCreated;


    public Transaction(Integer transactionID, Integer userID, String assetName, Double numOfAssets, LocalDate dateCreated) {
        this.transactionID = transactionID;
        this.userID = userID;
        this.assetName = assetName;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer userID, String assetName, Double assetPrice, Double numOfAssets, LocalDate dateCreated) {
        this.userID = userID;
        this.assetName = assetName;
        this.assetPrice = assetPrice;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

    public Transaction(Integer userID, String assetName, Double numOfAssets, LocalDate dateCreated) {
        this.userID = userID;
        this.assetName = assetName;
        this.numOfAssets = numOfAssets;
        this.dateCreated = dateCreated;
    }

}
