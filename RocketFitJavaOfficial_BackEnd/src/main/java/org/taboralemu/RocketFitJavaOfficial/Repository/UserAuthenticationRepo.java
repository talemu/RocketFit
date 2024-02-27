package org.taboralemu.RocketFitJavaOfficial.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.taboralemu.RocketFitJavaOfficial.Models.RFAuthUser;

public interface UserAuthenticationRepo extends JpaRepository<RFAuthUser, Integer>{
	
	@Query("Select id from RFAuthUser a where (a.userName = :loginKey or a.email_address = :loginKey) and a.password = :password")
	public Integer getIdBasedonUsernameAndPassword(@Param ("loginKey") String loginKey, @Param("password") String password);
}