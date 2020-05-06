package org.constructor.repository;

import org.constructor.domain.PhoneNumber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@SuppressWarnings("unused")
@Repository
public interface PhoneNumberRepository extends JpaRepository<PhoneNumber, Long> {

}
