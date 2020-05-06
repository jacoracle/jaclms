package org.constructor.service;

import java.util.Optional;
import org.constructor.domain.PhoneNumber;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link PhoneNumber}.
 */
public interface PhoneNumberService {
	
	 /**
     * Save a PhoneNumber.
     *
     * @param country the entity to save.
     * @return the persisted entity.
     */
	PhoneNumber save(PhoneNumber phoneNumber);

    /**
     * Get all the PhoneNumber.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<PhoneNumber> findAll(Pageable pageable);


    /**
     * Get the "id" PhoneNumber.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<PhoneNumber> findOne(Long id);

    /**
     * Delete the "id" PhoneNumber.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
