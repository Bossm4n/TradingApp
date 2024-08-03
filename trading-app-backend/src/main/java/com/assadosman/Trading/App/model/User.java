package com.assadosman.Trading.App.model;

public class User {
    private String name;
    private final int UserID;
    private String email;
    private String hashedPassword;
    private String DOB;

    public User(String name, String email, String password, String DOB, int UserID) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashingFunction(password);
        this.DOB = DOB;
        this.UserID = UserID;
    }

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public String getDOB() {
        return DOB;
    }

    public void setDOB(String DOB) {
        this.DOB = DOB;
    }

    public boolean checkDOB(String DOB){
        // Check DOB is valid
        return true;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getUserID() {
        return UserID;
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
        // Implement a hashing function
        return password;
    }
}
