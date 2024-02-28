package org.taboralemu.RocketFitJavaOfficial.Models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RFAuthUser {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	private String username;
	private String password;
	private String email_address;
	

	public RFAuthUser() {
		
	}
	
	public RFAuthUser(String username, String password, String email_address) {
		setUsername(username);
		setPassword(password);
		setEmail_address(email_address);
	}

	public int getId() {
		return id;
	}

	public String getPassword() {
		return password;
	}
	
	public String getUsername() {
		return username;
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

	public void setUsername(String userName) {
		this.username = userName;
	}
	
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
}
