package com.assadosman.Trading.App.model.user;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.time.LocalDate;


@Entity
@Data
@Table(name = "user")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer userID;

    @NotNull(message = "First Name cannot be null!")
    private String firstName;

    @NotNull(message = "Last Name cannot be null!")
    private String lastName;

    @NotNull(message = "Email cannot be null!")
    private String email;

    @NotNull(message = "You password cannot be null!")
    private String hashedPassword;

    @JsonProperty
    @NotNull(message = "Your Date of Birth cannot be null!")
    private LocalDate DOB;

    @NotNull(message = "Your balance cannot be null!")
    private Double balance;

    // Three constructor classes: Empty, full constructor and a full constructor without userID.
    public User() {
    }

    public User(Integer userID, String firstName, String lastName, String email, String hashedPassword, LocalDate DOB,
                Double balance) {
        this.userID = userID;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.DOB = DOB;
        this.balance = balance;
    }

    public User(String firstName, String lastName, String email, String hashedPassword, LocalDate DOB, Double balance) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.DOB = DOB;
        this.balance = balance;
    }

    public Double getBalance() {
        return balance;
    }

    public void setBalance(Double balance) {
        this.balance = balance;
    }

    public void addToBalance(Double additionalBalance){
        this.balance += additionalBalance;
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
        // Implement a hashing function use SHA-256
        return password;
    }
}
