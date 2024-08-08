package com.assadosman.Trading.App.model.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    //    @Query("SELECT s FROM user s WHERE s.email = ?1")
    Optional<User> findUserByEmail(String email);
}