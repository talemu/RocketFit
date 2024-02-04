package org.taboralemu.RocketFitJava2;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@SpringBootApplication
@EnableAsync
public class RocketFitJava2Application {

	public static void main(String[] args) {
		SpringApplication.run(RocketFitJava2Application.class, args);
	}

}
