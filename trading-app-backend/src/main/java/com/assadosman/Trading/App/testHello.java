package com.assadosman.Trading.App;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/hello")
public class testHello {

    @GetMapping
    public String sayHello() {
        System.out.println("Test messages");
        return "hello";
    }

}
