package com.assadosman.Trading.App.model.user;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;


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

    // Three constructor classes: Empty, full constructor and a full constructor without userID.
    public User() {
    }

    public User(String firstName,String lastName, String email, String password, LocalDate DOB, Integer userID) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashingFunction(password);
        this.DOB = DOB;
        this.userID = userID;
    }

    public User(String firstName, String lastName, String email, LocalDate DOB, String hashedPassword ) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.hashedPassword = hashedPassword;
        this.DOB = DOB;
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
}
