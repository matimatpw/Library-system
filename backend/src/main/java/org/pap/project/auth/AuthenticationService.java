package org.pap.project.auth;

import lombok.RequiredArgsConstructor;
import org.pap.project.config.JwtService;
import org.pap.project.user.Role;
import org.pap.project.user.User;
import org.pap.project.user.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public ResponseEntity<?> register(RegisterRequest request) {
        Optional<User> existingUser = repository.findByEmail(request.getEmail());
        if (existingUser.isPresent()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
        }
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(Role.USER)
                .loans(0)
                .build();
        repository.save(user);
        String token = jwtService.generateToken(user);
        var response = AuthenticationResponse.builder().token(token).build();
        return ResponseEntity.ok(response);
    }

    public ResponseEntity<?> authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
        Optional<User> user = repository.findByEmail(request.getEmail());
        if (user.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("User with this email already exists");
        }
        String token = jwtService.generateToken(user.get());
        var response = AuthenticationResponse.builder().token(token).build();
        return ResponseEntity.ok(response);
    }
}
