package org.constructor.repository;

import org.constructor.domain.Telefono;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface TelefonoRepository extends JpaRepository<Telefono, Long> {

}
