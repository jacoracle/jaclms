/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.TiposBloquesComponentes;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */

public interface TiposBloquesComponentesService {
	
	   /**
     * Save a tiposBloquesComponentes.
     *
     * @param modalidad the entity to save.
     * @return the persisted entity.
     */
	TiposBloquesComponentes save(TiposBloquesComponentes tiposBloquesComponentes);

    /**
     * Get all the tiposBloquesComponentes.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TiposBloquesComponentes> findAll(Pageable pageable);


    /**
     * Get the "id" tiposBloquesComponentes.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TiposBloquesComponentes> findOne(Long id);

    /**
     * Delete the "id" tiposBloquesComponentes.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
