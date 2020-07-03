/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.Temas;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface TemasService {


	/**
     * Save a Temas.
     *
     * @param temas the entity to save.
     * @return the persisted entity.
     */
    Temas save(Temas temas);
    
    /**
     * Get all the temas.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Temas> findAll(Pageable pageable);
    
    /**
     * Get the "id" temas.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Temas> findOne(Long id);
    
    /**
     * Delete the "id" temas.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
