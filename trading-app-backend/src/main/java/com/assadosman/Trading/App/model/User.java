package com.assadosman.Trading.App.model;

public class User {
    private String name;
    private int UserID;
    private String email;
    private String hashedPassword;

    public User(String name, String email, String password) {
        this.name = name;
        this.email = email;
        this.hashedPassword = hashingFunction(password);
    }

    public String getName(){
        return name;
    }
    public String getEmail() {
        return email;
    }

    public String testPassword(String inputtedPassword){
        // Put password through a hashing function then
        String hashedInput = hashingFunction(inputtedPassword);

        if(hashedPassword.equals(hashedInput)){
            return inputtedPassword;
        }
        else{
            return "Incorrect Password";
        }
    }

    private String hashingFunction(String password){
        // Implement a hashing function
        return password;
    }
}
