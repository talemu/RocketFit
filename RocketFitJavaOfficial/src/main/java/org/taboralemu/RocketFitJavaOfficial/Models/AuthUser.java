package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class AuthUser {
	
	@Id
	public int id;
	public String userName;
	public String password;
	public String email_address;
	

	public AuthUser() {
		
	}

	public int getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}
	
	public String getUserName() {
		return userName;
	}
	
	public String getEmail_address() {
		return email_address;
	}

	public void setId(int id) {
		this.id = id;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}
	
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
}
