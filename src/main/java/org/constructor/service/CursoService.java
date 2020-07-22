package org.constructor.service;

import org.constructor.domain.Curso;
import org.constructor.domain.CursoFicha;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
    
    /**
     * 
     * @param authentication
     * @param cursoFicha
     * @param file
     * @return
     */
    CursoFicha save(Authentication authentication, CursoFicha cursoFicha, MultipartFile file);

    /**
     * Get all the cursos.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Curso> findAll(Pageable pageable);
    
    List<Curso> findAllCursoUserId(Authentication authentication);

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
    
    String FindCourseCover(Long id);
    
    Long FindByContentCourseCover(String content);
    
}
