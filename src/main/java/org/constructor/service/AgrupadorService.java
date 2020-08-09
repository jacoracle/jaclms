/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.module.domain.Agrupador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface AgrupadorService {

	
	 /**
     * Save a agrupador.
     *
     * @param agrupador the entity to save.
     * @return the persisted entity.
     */
	Agrupador save(Agrupador agrupador);

    /**
     * Get all the agrupador.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Agrupador> findAll(Pageable pageable);


    /**
     * Get the "id" agrupador.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Agrupador> findOne(Long id);

    /**
     * Delete the "id" agrupador.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
