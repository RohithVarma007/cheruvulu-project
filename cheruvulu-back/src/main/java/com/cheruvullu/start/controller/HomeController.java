package com.cheruvullu.start.controller;

import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Scope("request")
@RequestMapping("")
// @CrossOrigin(origins = "http://localhost:5173")
@CrossOrigin(origins = "https://cheruvulu-project.vercel.app/")
public class HomeController {

    @GetMapping("/")
    public String home() {
        return "Backend is running!";
    }

}
