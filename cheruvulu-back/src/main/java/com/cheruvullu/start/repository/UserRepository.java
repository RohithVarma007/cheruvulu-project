package com.cheruvullu.start.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cheruvullu.start.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long> {
    Users findByUserName(String userName);
}
