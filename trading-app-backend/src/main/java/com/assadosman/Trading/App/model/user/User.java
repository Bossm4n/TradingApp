package com.assadosman.Trading.App.model.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.util.HashMap;


@Entity
@Data
@Table
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    private String firstName;
    private String lastName;
    private String email;
    private String hashedPassword;
    private LocalDate DOB;
    private Double balance;
    private HashMap<Integer, Double> assetsPurchased;

    // Three constructor classes: Empty, full constructor and a full constructor without userID.
    public User() {
    }

    public User(Integer userID, String firstName, String lastName, String email, String hashedPassword, LocalDate DOB,
                Double balance, HashMap<Integer, Double> assetsPurchased) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.DOB = DOB;
        this.balance = balance;
        this.assetsPurchased = assetsPurchased;
    }

    public User(String firstName, String lastName, String email, String hashedPassword, LocalDate DOB, Double balance,
                HashMap<Integer, Double> assetsPurchased) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.DOB = DOB;
        this.balance = balance;
        this.assetsPurchased = assetsPurchased;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getName(){
        return firstName + " " + lastName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public LocalDate getDOB() {
        return DOB;
    }

    public void setDOB(LocalDate DOB) {
        this.DOB = DOB;
    }


    public void setEmail(String email) {
        this.email = email;
    }

    public Integer getUserID() {
        return userID;
    }

    private boolean testPassword(String inputtedPassword){
        // Put password through a hashing function then
        String hashedInput = hashingFunction(inputtedPassword);

        return hashedPassword.equals(hashedInput);
    }

    public void changePassword(String oldPassword, String newPassword){
        if(testPassword(oldPassword)){
            this.hashedPassword = hashingFunction(newPassword);
        }
    }

    private String hashingFunction(String password){
        // Implement a hashing function use SHA-25G
        return password;
    }

    public HashMap<Integer,Double> getAssets() {
        return assetsPurchased;
    }

    public void addAsset(Integer transactionID, Double transactionValue){
        assetsPurchased.put(transactionID, transactionValue);
    }
}
