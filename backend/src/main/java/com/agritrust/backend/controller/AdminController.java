package com.agritrust.backend.controller;

import com.agritrust.backend.entity.User;
import com.agritrust.backend.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;

    public AdminController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Get all users
    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    // Get one user by ID
    @GetMapping("/users/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {

        return userRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }

    // Activate or deactivate a user
    @PutMapping("/users/{id}/status")
    public ResponseEntity<?> updateUserStatus(
            @PathVariable Long id,
            @RequestBody Map<String, String> request) {

        return userRepository.findById(id)
                .map(user -> {

                    String status = request.get("status");

                    if (!"ACTIVE".equals(status)
                            && !"INACTIVE".equals(status)) {

                        return ResponseEntity
                                .badRequest()
                                .body("Status must be ACTIVE or INACTIVE");
                    }

                    user.setStatus(status);

                    User updatedUser = userRepository.save(user);

                    return ResponseEntity.ok(updatedUser);
                })
                .orElseGet(() ->
                        ResponseEntity.notFound().build()
                );
    }
}