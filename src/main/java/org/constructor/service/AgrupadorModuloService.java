/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.module.domain.AgrupadorModulo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface AgrupadorModuloService {

	
	/**
     * Save a agrupadorModulo.
     *
     * @param agrupadorModulo the entity to save.
     * @return the persisted entity.
     */
	AgrupadorModulo save(AgrupadorModulo agrupadorModulo);

    /**
     * Get all the agrupador.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AgrupadorModulo> findAll(Pageable pageable);


    /**
     * Get the "id" agrupadorModulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AgrupadorModulo> findOne(Long id);

    /**
     * Delete the "id" agrupadorModulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
