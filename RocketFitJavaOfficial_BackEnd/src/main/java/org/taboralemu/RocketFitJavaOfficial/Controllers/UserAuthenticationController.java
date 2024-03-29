package org.taboralemu.RocketFitJavaOfficial.Controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.taboralemu.RocketFitJavaOfficial.Models.AuthUser;
import org.taboralemu.RocketFitJavaOfficial.Services.UserAuthenticationService;

@RequestMapping("api/auth")
@RestController
public class UserAuthenticationController {
	
	@Autowired
	public UserAuthenticationService _authUserService;
	
	@GetMapping (value = "/users")
	public List<AuthUser> retrieveUsers() {
		return _authUserService.getAllUsers();
	}
	
	@GetMapping (value = "/login")
	public int getUserIdGivenUsernameAndPassword(@RequestParam String loginKey, @RequestParam String password) {
		return _authUserService.getIdGivenUNandPW(loginKey, password);
	}

}
