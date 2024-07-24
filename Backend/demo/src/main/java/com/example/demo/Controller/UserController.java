package com.example.demo.Controller;

import com.example.demo.Entity.AppUser;
import com.example.demo.Entity.Role;
import com.example.demo.Service.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final CustomUserDetailsService customUserDetailsService;

    @Autowired
    public UserController(CustomUserDetailsService customUserDetailsService) {
        this.customUserDetailsService = customUserDetailsService;
    }

    @GetMapping("/{username}/roles")
    public List<String> getUserRoles(@PathVariable String username) {
        Optional<AppUser> appUser = customUserDetailsService.getUserByUsername(username);
        if (appUser.isPresent()) {
            return appUser.get().getRoles().stream()
                    .map(Role::getName)
                    .collect(Collectors.toList());
        } else {
            return List.of(); // return empty list
        }
    }
}
