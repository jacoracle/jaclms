package org.constructor.service;

import java.util.Optional;
import org.constructor.domain.Telefono;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Telefono}.
 */
public interface TelefonoService {
	
	 /**
     * Save a PhoneNumber.
     *
     * @param country the entity to save.
     * @return the persisted entity.
     */
	Telefono save(Telefono telefono);

    /**
     * Get all the PhoneNumber.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Telefono> findAll(Pageable pageable);


    /**
     * Get the "id" PhoneNumber.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Telefono> findOne(Long id);

    /**
     * Delete the "id" PhoneNumber.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
