package com.assadosman.Trading.App;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class TradingAppApplication {

	public static void main(String[] args) {
		// Loading Dontenv ensures that we can use our env file to access the database
		Dotenv dotenv = Dotenv.configure()
				.directory("/") // if in resources, use "/"
				.load();
		SpringApplication.run(TradingAppApplication.class, args);
	}

}
