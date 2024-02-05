package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.Models.AuthUser;
import org.taboralemu.RocketFitJavaOfficial.Repository.UserAuthenticationRepo;

@Service
public class UserAuthenticationService {
	
	@Autowired
	public UserAuthenticationRepo _authUserRepo;
	
	public List<AuthUser> getAllUsers() {
		return _authUserRepo.findAll();
	}
	
	public int getIdGivenUNandPW(String loginKey, String password) {
		try {
			return _authUserRepo.getIdBasedonUsernameAndPassword(loginKey, password);
		}
		catch (Exception e) {
			return -1;
		}
	}

}
