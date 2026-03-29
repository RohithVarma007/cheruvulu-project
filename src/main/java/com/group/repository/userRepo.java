package com.group.repository;

import org.apache.catalina.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.group.tables.users;

public interface userRepo extends JpaRepository<users, Long> {
    
}
