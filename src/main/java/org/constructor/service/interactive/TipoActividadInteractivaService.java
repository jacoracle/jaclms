/**
 * 
 */
package org.constructor.service.interactive;

import java.util.Optional;

import org.constructor.domain.interactive.TipoActividadInteractiva;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface TipoActividadInteractivaService {
	
	
	/**
     * Save a tipoActividadInteractiva.
     *
     * @param tipoActividadInteractiva the entity to save.
     * @return the persisted entity.
     */
    TipoActividadInteractiva save(TipoActividadInteractiva tipoActividadInteractiva);
    
    /**
     * Get all the tipoActividadInteractiva.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<TipoActividadInteractiva> findAll(Pageable pageable);
    
    
    /**
     * Get the "id" tipoActividadInteractiva.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<TipoActividadInteractiva> findOne(Long id);
    
    /**
     * Delete the "id" tipoActividadInteractiva.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
