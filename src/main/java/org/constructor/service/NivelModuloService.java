package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.NivelModulo;
import org.constructor.response.NivelJerarquicoModuloResponse;
import org.constructor.response.NivelJerarquicoResponse;
import org.constructor.service.dto.NivelModuloDTO;
import org.constructor.service.dto.NivelJerarquicoModuloDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing {@link NivelModulo}.
 */
public interface NivelModuloService {
	
	 /**
     * Save a NivelModulo.
     *
     * @param nivelJerarquico the entity to save.
     * @return the persisted entity.
     */
    NivelModulo saveCurso(NivelModuloDTO nivelJerarquico) throws Exception;
    
    /**
     * module save
     * 
     * @param nivelJerarquico
     * @return
     * @throws Exception
     */
    NivelModulo saveModulo(NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception;
    
    
    /**
     * updateNivelJerarquico
     * @param nivelModuloDTO
     * @return
     * @throws Exception
     */
    Optional<NivelModulo> updateNivelJerarquicoCurso(NivelModuloDTO nivelModuloDTO) throws Exception;

    
    /**
     * 
     * @param nivelJerarquicoModulo
     * @return
     * @throws Exception
     */
    Optional<NivelModulo> updateNivelJerarquicoModule(NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception;

    /**
     * Get all the nivelJerarquico.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NivelModulo> findAll(Pageable pageable);
    
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
