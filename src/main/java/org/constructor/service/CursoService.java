package org.constructor.service;

import org.constructor.domain.Curso;
import org.constructor.domain.CursoFicha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Optional;

/**
 * Service Interface for managing {@link Curso}.
 */
public interface CursoService {

    /**
     * Save a curso.
     *
     * @param curso the entity to save.
     * @return the persisted entity.
     */
    Curso save(Curso curso);
    
    CursoFicha save(CursoFicha cursoFicha);

    /**
     * Get all the cursos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Curso> findAll(Pageable pageable);


    /**
     * Get the "id" curso.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Curso> findOne(Long id);

    /**
     * Delete the "id" curso.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
