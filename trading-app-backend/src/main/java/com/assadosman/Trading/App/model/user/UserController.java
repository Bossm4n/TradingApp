package com.assadosman.Trading.App.model.user;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@Validated
@RequestMapping(path="api/user")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getUsers(){
        return userService.getUsers();
    }

    @PostMapping
    public ResponseEntity<String> addUser(@Valid @RequestBody User user){
        userService.addNewUser(user);

        return new ResponseEntity<>("User is valid", HttpStatus.OK);
    }

    @DeleteMapping(path="{userID}")
    public void removeUser(@PathVariable("userID") Integer userID){
        userService.removeUser(userID);
    }

    @PutMapping(path = "/set/{userID}")
    public void updateUser(@PathVariable("userID") Integer userID,
                           @RequestParam(required = false) String firstName,
                           @RequestParam(required = false) String lastName,
                           @RequestParam(required = false) String email,
                           @RequestParam(required = false) Double balance
                           ){
        userService.updateUser(userID, firstName, lastName, email, balance);
    }

    @PutMapping(path = "/update_balance/{userID}")
    public void updateBalance(@PathVariable("userID") Integer userID,
                           @RequestParam(required = true) Double balance
    ){
        userService.updateUserBalance(userID, balance);
    }
}
