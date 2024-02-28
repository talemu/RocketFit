package org.taboralemu.RocketFitJavaOfficial.DTOs;

public class RFAuthUserDTO {
	
	private int id;
	private String username;
	private String email_address;
	
	public RFAuthUserDTO() {
		
	}
	
	public RFAuthUserDTO(int aid, String userName, String email_address) {
		this.id = aid;
		this.username = userName;
		this.email_address = email_address;
	}
	
	public int getId() {
		return id;
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
	public void setUsername(String userName) {
		this.username = userName;
	}
	public void setEmail_address(String email_address) {
		this.email_address = email_address;
	}
	
	

}
