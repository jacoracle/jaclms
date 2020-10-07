/**
 * 
 */
package org.constructor.service.rutas;

import java.util.Optional;

import org.constructor.domain.rutas.RutasAprendizaje;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface RutasAprendizajeService {

	
	/**
     * Save a RutasAprendizaje.
     *
     * @param rutasAprendizaje the entity to save.
     * @return the persisted entity.
     */
    RutasAprendizaje save(RutasAprendizaje rutasAprendizaje);

    /**
     * Get all the versions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RutasAprendizaje> findAll(Pageable pageable);


    /**
     * Get the "id" RutasAprendizaje.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<RutasAprendizaje> findOne(Long id);

    /**
     * Delete the "id" RutasAprendizaje.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
