package org.pap.project.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path = "/users")
public class UserController {
    @Autowired
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllUsers() {
        return new ResponseEntity<>(userService.allUsers(), HttpStatus.OK);
    }

    @GetMapping("/byRole/{role}")
    public ResponseEntity<List<User>> getUsersByRole(@PathVariable Role role) {
        return new ResponseEntity<>(userService.getUsersByRole(role), HttpStatus.OK);
    }

    @GetMapping("/byID/{ID}")
    public ResponseEntity<Optional<User>> getUsersById(@PathVariable Integer ID) {
        return new ResponseEntity<Optional<User>>(userService.getUserByID(ID), HttpStatus.OK);
    }

}
