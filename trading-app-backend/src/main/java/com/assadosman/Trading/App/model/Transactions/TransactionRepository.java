package com.assadosman.Trading.App.model.Transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findAllByUserID(Integer userID);
    List<Transaction> findAllByAssetISIN(String assetISIN);
    List<Transaction> findAllByUserIDAndAssetISIN(Integer userID, String assetISIN);
}
