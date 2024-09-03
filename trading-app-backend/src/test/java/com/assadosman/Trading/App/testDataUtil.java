package com.assadosman.Trading.App;

import com.assadosman.Trading.App.model.Transactions.Transaction;
import com.assadosman.Trading.App.model.user.User;

import java.time.LocalDate;

public class testDataUtil {

    public static User createUserA(){
        return User.builder()
                .userID(1)
                .DOB(LocalDate.of(2005, 2,12))
                .email("assadjaber38@gmail.com")
                .lastName("Assad")
                .firstName("Jaber")
                .hashedPassword("assad1234")
                .balance(50000.0)
                .build();
    }

    public static Transaction createPurchaseA(){
        return Transaction.builder()
                .assetPrice(100.0)
                .userID(1)
                .assetName("CAC")
                .dateCreated(LocalDate.of(2024, 9, 2))
                .transactionID(100)
                .numOfAssets(1.0)
                .build();
    }
}
