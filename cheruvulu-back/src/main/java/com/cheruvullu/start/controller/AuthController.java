package com.cheruvullu.start.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cheruvullu.start.dto.LoginRequest;
import com.cheruvullu.start.entity.Users;
import com.cheruvullu.start.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@CrossOrigin
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Users user = userRepository
                .findByUserName(request.getUserName());

        if (user != null &&
                user.getUserPassword().equals(request.getPin())) {

            Map<String, Object> response = new HashMap<>();

            // response.put("message", "Login Success");
            response.put("userName", user.getUserName());
            response.put("userId", user.getUserId());

            return ResponseEntity.ok(response);

            // return ResponseEntity.ok("Login Success");
        }

        return ResponseEntity
                .status(HttpStatus.UNAUTHORIZED)
                .body("Invalid PIN");
    }
}
