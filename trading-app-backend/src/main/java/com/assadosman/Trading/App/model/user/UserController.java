package com.assadosman.Trading.App.model.user;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.time.Month;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/user")
public class UserController {
    @GetMapping
    public List<User> getUsers(){
        return List.of(new User("Basil","Osman","basil.osman@gmail.com", LocalDate.of(2005, Month.AUGUST,22),"5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8"));
    }
}
