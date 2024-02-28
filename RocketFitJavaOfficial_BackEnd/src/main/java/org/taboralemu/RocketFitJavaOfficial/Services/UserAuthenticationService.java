package org.taboralemu.RocketFitJavaOfficial.Services;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.taboralemu.RocketFitJavaOfficial.DTOs.RFAuthUserDTO;
import org.taboralemu.RocketFitJavaOfficial.Models.RFAuthUser;
import org.taboralemu.RocketFitJavaOfficial.Repository.UserAuthenticationRepo;

@Service
public class UserAuthenticationService {
	
	@Autowired
	public UserAuthenticationRepo _authUserRepo;
	
	public List<RFAuthUserDTO> getAllUsers() {
		CompletableFuture <List<RFAuthUser>> rfAuthUsers = CompletableFuture.completedFuture(_authUserRepo.findAll());
		List<RFAuthUserDTO> rfAuthDTOs = new ArrayList<RFAuthUserDTO>();
		for (RFAuthUser x : rfAuthUsers.join()) {
			RFAuthUserDTO rfAUtemp = new RFAuthUserDTO(
					x.getId(),
					x.getUserName(),
					x.getEmail_address()
					);
			rfAuthDTOs.add(rfAUtemp);
		}
		return rfAuthDTOs;
	}
	
	public Integer getIdGivenUNandPW(String loginKey, String password) {
		try {
			int i = _authUserRepo.getIdBasedonUsernameAndPassword(loginKey, password);
			return i;
		}
		catch (Exception e) {
			return -10;
		}
	}

}
