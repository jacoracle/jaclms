/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.Modulo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface ModuloService {

	
	/**
     * Save a modulo.
     *
     * @param modulo the entity to save.
     * @return the persisted entity.
     */
    Modulo save(Modulo modulo);
    
    /**
     * Get all the modulo.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Modulo> findAll(Pageable pageable);
    
    /**
     * Get the "id" modulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Modulo> findOne(Long id);
    
    /**
     * Delete the "id" modulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
