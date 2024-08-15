package com.assadosman.Trading.App.model.Transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findAllByUserID(Integer userID);
    List<Transaction> findAllByAssetName(String assetName);
    List<Transaction> findAllByUserIDAndAssetName(Integer userID, String assetName);
}