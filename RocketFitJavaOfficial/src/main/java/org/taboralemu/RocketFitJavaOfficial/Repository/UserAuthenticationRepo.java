package org.taboralemu.RocketFitJavaOfficial.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taboralemu.RocketFitJavaOfficial.Models.AuthUser;

public interface UserAuthenticationRepo extends JpaRepository<AuthUser, Integer>{
	
	@Query("Select id from AuthUser a where (a.userName = :loginKey or a.email_address = :loginKey) and a.password = :password")
	public int getIdBasedonUsernameAndPassword(@Param ("loginKey") String loginKey, @Param("password") String password);
}