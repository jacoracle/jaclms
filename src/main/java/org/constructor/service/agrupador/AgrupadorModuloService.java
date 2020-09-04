/**
 * 
 */
package org.constructor.service.agrupador;

import java.util.List;
import java.util.Optional;

import org.constructor.domain.agrupador.AgrupadorModulo;
import org.constructor.service.dto.agrupador.UpdateAgrupadorDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * @author Edukai
 *
 */
public interface AgrupadorModuloService {

	
	/**
     * Save a agrupadorModulo.
     *
     * @param agrupadorModulo the entity to save.
     * @return the persisted entity.
     */
	AgrupadorModulo save(AgrupadorModulo agrupadorModulo);
	
	/**
	 * Update
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	List<AgrupadorModulo> updateAgrupadorModulo(List<UpdateAgrupadorDTO> dto) throws Exception;

    /**
     * Get all the agrupador.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<AgrupadorModulo> findAll(Pageable pageable);


    /**
     * Get the "id" agrupadorModulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<AgrupadorModulo> findOne(Long id);

    /**
     * Delete the "id" agrupadorModulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
}
