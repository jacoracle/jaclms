/**
 * 
 */
package org.constructor.service.rutas;

import java.util.Optional;

import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.service.dto.rutas.NivelJerarquicoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface NivelJerarquicoService {

	
	/**
     * Save a NivelJerarquico.
     *
     * @param nivelJerarquico the entity to save.
     * @return the persisted entity.
     */
    NivelJerarquico save(NivelJerarquico nivelJerarquico);
    
 
    /**
     * NivelJerarquicoDTO
     * @param authentication
     * @param nivelDto
     * @return
     */
    NivelJerarquico save (NivelJerarquicoDTO nivelDto);

    /**
     * Get all the versions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<NivelJerarquico> findAll(Pageable pageable);


    /**
     * Get the "id" NivelJerarquico.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<NivelJerarquico> findOne(Long id);

    /**
     * Delete the "id" NivelJerarquico.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    
    

}
