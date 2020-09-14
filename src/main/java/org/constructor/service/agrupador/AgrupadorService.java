/**
 * 
 */
package org.constructor.service.agrupador;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.agrupador.Agrupador;
import org.constructor.service.dto.agrupador.AgrupadorDTO;
import org.constructor.service.dto.agrupador.AgrupadorFiltroDTO;
import org.constructor.service.dto.agrupador.AgrupadorUpdateDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

/**
 * @author Edukai
 *
 */
public interface AgrupadorService {

	
	 /**
     * Save a agrupador.
     *
     * @param agrupador the entity to save.
     * @return the persisted entity.
     */
	Agrupador save(Agrupador agrupador);
	
	
	/**
	 * agrupadorDTO
	 * @param authentication
	 * @param moduloDTO
	 * @return
	 */
	AgrupadorDTO save(Authentication authentication, Agrupador agrupadorDTO);

    /**
     * service for the last 10
     * @param pageable
     * @return
     */
    Page<Agrupador> findFirst20AgrupadorByOrderByIdDesc(Pageable pageable, Authentication authentication);

    
    /**
     * Filter by agrupador
     * @param dto
     * @return
     * @throws Exception
     */
    Set<Agrupador> findAgrupadorByTituloByDescripcionByEtiqueta(AgrupadorFiltroDTO dto, Authentication authentication) throws Exception ;
    /**
     * Get all the agrupador.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Agrupador> findAll(Pageable pageable);


    /**
     * findAllAgrupadorUserId
     * @param authentication
     * @return
     */
    List<Agrupador> findAllAgrupadorUserId(Authentication authentication);
    /**
     * Get the "id" agrupador.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Agrupador> findOne(Long id);
    
    


	Optional<Agrupador> updateAgrupador(AgrupadorUpdateDTO dto) throws Exception;
    /**
     * Delete the "id" agrupador.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);

}
