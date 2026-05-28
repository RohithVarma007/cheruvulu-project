package com.cheruvullu.start.dto;


import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String userName;
    private String pin;
}
