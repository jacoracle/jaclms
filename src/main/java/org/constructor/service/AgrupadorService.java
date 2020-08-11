/**
 * 
 */
package org.constructor.service;

import java.util.List;
import java.util.Optional;

import org.constructor.module.domain.Agrupador;
import org.constructor.service.dto.AgrupadorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

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
	 * agrupadorDTO
	 * @param authentication
	 * @param moduloDTO
	 * @return
	 */
	AgrupadorDTO save(Authentication authentication, Agrupador agrupadorDTO);


    /**
     * Get all the agrupador.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Agrupador> findAll(Pageable pageable);


    /**
     * findAllAgrupadorUserId
     * @param authentication
     * @return
     */
    List<Agrupador> findAllAgrupadorUserId(Authentication authentication);
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
