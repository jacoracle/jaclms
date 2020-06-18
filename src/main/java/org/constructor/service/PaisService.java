package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.Pais;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link Pais}.
 */

public interface PaisService {
    /**
     * Save a Country.
     *
     * @param country the entity to save.
     * @return the persisted entity.
     */
    Pais save(Pais pais);

    /**
     * Get all the countries.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Pais> findAll(Pageable pageable);


    /**
     * Get the "id" Country.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Pais> findOne(Long id);

    /**
     * Delete the "id" Country.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
