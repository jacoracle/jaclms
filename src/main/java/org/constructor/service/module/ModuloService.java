/**
 * 
 */
package org.constructor.service.module;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.module.Modulo;
import org.constructor.service.dto.module.ModuloDTO;
import org.constructor.service.dto.module.ModuloFiltroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;

/**
 * @author Edukai
 *
 */
public interface ModuloService {

	
	/**
     * Save a modulo.
     *
     * @param modulo the entity to save.
     * @return the persisted entity.
     */
    Modulo save(Modulo modulo);
    
    /**
     * ModuloDTO
     * @param authentication
     * @param moduloDTO
     * @param file
     * @return
     */
    ModuloDTO save(Authentication authentication, Modulo moduloDTO);

    /**
     * Get all the modulo.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<Modulo> findAll(Pageable pageable);
    
    
    /**
     * findModuloByBusqueda
     * @param dto
     * @return
     * @throws Exception
     */
    Set<Modulo>  findModuloByFiltros(ModuloFiltroDTO dto, Authentication authentication) throws Exception ;

 
    /**
     * findAllModuloUserId
     * @param authentication
     * @return
     */
    List<Modulo> findAllModuloUserId(Authentication authentication);
    /**
     * Get the "id" modulo.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    Optional<Modulo> findOne(Long id);
    
    /**
     * Delete the "id" modulo.
     *
     * @param id the id of the entity.
     */
    void delete(Long id);
    
  
}
