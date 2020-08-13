/**
 * 
 */
package org.constructor.service;

import java.util.Optional;

import org.constructor.interactive.domain.ActividadInteractiva;
import org.constructor.service.dto.ActividadInteractivaDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface ActividadInteractivaService {

	
	/**
     * Save a actividadInteractiva.
     *
     * @param actividadInteractiva the entity to save.
     * @return the persisted entity.
     */
    ActividadInteractiva save(ActividadInteractiva actividadInteractiva);
    
    /**
     * 
     * @param dto
     * @return
     * @throws Exception
     */
	Optional<ActividadInteractiva> updateActividad(ActividadInteractivaDTO dto) throws Exception;

    /**
     * Get all the actividadInteractiva.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<ActividadInteractiva> findAll(Pageable pageable);
    
    /**
     * Update ActividadInteractiva
     * @param dto
     * @return
     * @throws Exception
     */
    
    
    /**
     * Get the "id" actividadInteractiva.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<ActividadInteractiva> findOne(Long id);
    
    /**
     * Delete the "id" actividadInteractiva.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
