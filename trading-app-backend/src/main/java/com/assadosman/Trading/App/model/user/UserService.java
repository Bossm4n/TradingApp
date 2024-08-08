package com.assadosman.Trading.App.model.user;

import jakarta.mail.internet.AddressException;
import jakarta.mail.internet.InternetAddress;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getUsers(){
        return userRepository.findAll();
    }

    public void addNewUser(User user) {
        Optional<User> userFoundByEmail = userRepository.findUserByEmail(user.getEmail());
        if(userFoundByEmail.isPresent()){
            throw new IllegalStateException("email taken");
        }

        userRepository.save(user);
    }

    public void removeUser(int userID){
        if(!userRepository.existsById(userID)){
            throw new IllegalStateException("Invalid user ID");
        }

        User userToRemove = userRepository.getReferenceById(userID);
        userRepository.delete(userToRemove);
    }

    @Transactional
    public void updateUser(int userID, String firstName, String lastName, String email){
        if(!userRepository.existsById(userID)){
            throw new IllegalStateException("Invalid user ID");
        }

        User user = userRepository.getReferenceById(userID);

        if (firstName != null && !firstName.isEmpty() && firstName.length()<30 && !Objects.equals(user.getFirstName(), firstName)){
            user.setFirstName(firstName);
        }
        if (lastName != null && !lastName.isEmpty() && lastName.length()<30 && !Objects.equals(user.getLastName(), lastName)){
            user.setLastName(lastName);
        }
        if (email != null && checkEmail(email) && !Objects.equals(user.getEmail(), email)){
            Optional<User> optionalUser = userRepository.findUserByEmail(email);
            if(optionalUser.isPresent()){
                throw new IllegalStateException("Email taken");
            }
            user.setEmail(email);
        }
    }

    public boolean checkEmail(String email){
        boolean result = true;
        try {
            InternetAddress emailAddress = new InternetAddress(email);
            emailAddress.validate();
        } catch (AddressException ex) {
            result = false;
        }
        return result;
    }
}
