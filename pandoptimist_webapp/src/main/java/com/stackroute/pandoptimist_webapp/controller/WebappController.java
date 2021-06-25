package com.stackroute.pandoptimist_webapp.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class WebappController {
    @GetMapping("/")
    public String getIndex() {
        return "index.html";
    }

//    https://karthi-net.medium.com/how-to-deploy-angular-6-spring-boot-app-as-single-deployment-unit-a0a122860ce8

}