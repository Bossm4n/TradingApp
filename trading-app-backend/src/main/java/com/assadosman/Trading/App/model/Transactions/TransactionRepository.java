package com.assadosman.Trading.App.model.Transactions;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Integer> {
    List<Transaction> findAllByUserID(Integer userID);
    List<Transaction> findAllByAssetID(Integer assetID);
    List<Transaction> findAllByUserIDAndAssetID(Integer userID, Integer assetID);
}
