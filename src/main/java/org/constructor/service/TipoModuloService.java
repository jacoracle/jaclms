/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.TipoModulo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface TipoModuloService {

	
	/**
     * Save a TipoModulo.
     *
     * @param tipoModulo the entity to save.
     * @return the persisted entity.
     */
    TipoModulo save(TipoModulo tipoModulo);
    
    /**
     * Get all the tipoModulo.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoModulo> findAll(Pageable pageable);
    
    /**
     * Get the "id" tipoModulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoModulo> findOne(Long id);
    
    /**
     * Delete the "id" tipoModulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}

