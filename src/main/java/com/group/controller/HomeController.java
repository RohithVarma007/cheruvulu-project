package com.group.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.group.repository.userRepo;
import com.group.tables.users;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@Scope("request")
@RequestMapping("")
@CrossOrigin(origins = "http://localhost:5173")
public class HomeController {

    @Autowired
    private userRepo repo;

    @GetMapping("/")
    public String home() {
        return "Backend is running!";
    }

    @PostMapping("/add")
    public String  postMethodName(@RequestBody users entity) {
        users u = new users();
        u.setName(entity.getName());
        repo.save(u);
        return "user saved";
    }

}
