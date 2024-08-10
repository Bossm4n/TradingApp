package com.assadosman.Trading.App.model.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(path="api/v1/user")
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
    public void addUser(@RequestBody User user){
        userService.addNewUser(user);
    }

    @DeleteMapping(path="{userID}")
    public void removeUser(@PathVariable("userID") int userID){
        userService.removeUser(userID);
    }

    @PutMapping(path = "{userID}")
    public void updateUser(@PathVariable("userID") int userID,
                           @RequestParam(required = false) String firstName,
                           @RequestParam(required = false) String lastName,
                           @RequestParam(required = false) String email,
                           @RequestParam(required = false) Double balance
                           ){
        userService.updateUser(userID,firstName,lastName,email,balance);
    }
}
