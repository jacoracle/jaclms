package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.NivelJerarquico;
import org.constructor.response.NivelJerarquicoModuloResponse;
import org.constructor.response.NivelJerarquicoResponse;
import org.constructor.service.dto.NivelJerarquicoDTO;
import org.constructor.service.dto.NivelJerarquicoModuloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NivelJerarquico}.
 */
public interface NivelJerarquicoService {
	
	 /**
     * Save a NivelJerarquico.
     *
     * @param nivelJerarquico the entity to save.
     * @return the persisted entity.
     */
    NivelJerarquico saveCurso(NivelJerarquicoDTO nivelJerarquico) throws Exception;
    
    /**
     * module save
     * 
     * @param nivelJerarquico
     * @return
     * @throws Exception
     */
    NivelJerarquico saveModulo(NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception;
    
    
    /**
     * updateNivelJerarquico
     * @param nivelJerarquicoDTO
     * @return
     * @throws Exception
     */
    Optional<NivelJerarquico> updateNivelJerarquicoCurso(NivelJerarquicoDTO nivelJerarquicoDTO) throws Exception;

    
    /**
     * 
     * @param nivelJerarquicoModulo
     * @return
     * @throws Exception
     */
    Optional<NivelJerarquico> updateNivelJerarquicoModule(NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception;

    /**
     * Get all the nivelJerarquico.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NivelJerarquico> findAll(Pageable pageable);
    
    /**
     * Get the "id" nivelJerarquico.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    NivelJerarquicoResponse findOneCurso(Long id);
    
    /**
     * 
     * @param id
     * @return
     */
    NivelJerarquicoModuloResponse findOneModulo(Long id);

    /**
     * Delete the "id" nivelJerarquico.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
