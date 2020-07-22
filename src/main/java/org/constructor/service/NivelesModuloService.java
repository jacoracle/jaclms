/**
 * 
 */
package org.constructor.service;

import java.util.Optional;
import java.util.Set;

import org.constructor.module.domain.NivelesModulo;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface NivelesModuloService {

	 /**
     * Save a NivelesModulo.
     *
     * @param nivelesCurso the entity to save.
     * @return the persisted entity.
     */
    NivelesModulo save(NivelesModulo nivelesModulo);

    /**
     * Get all the NivelesModulo.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NivelesModulo> findAll(Pageable pageable);


    /**
     * Get the "id" NivelesModulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NivelesModulo> findOne(Long id);
    
    /**
     * Find by modulo.
     *
     * @param id the id
     * @return the sets the
     */
    Set<NivelesModulo> findByModulo(Long id);

    /**
     * Delete the "id" NivelesModulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
