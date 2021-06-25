package com.stackroute.pandoptimist_webapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@SpringBootApplication
@EnableEurekaClient
public class PandoptimistWebappApplication {

	public static void main(String[] args) {
		SpringApplication.run(PandoptimistWebappApplication.class, args);
	}

}
