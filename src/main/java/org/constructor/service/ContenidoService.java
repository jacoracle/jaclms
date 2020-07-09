package org.constructor.service;

import java.util.Optional;

import org.constructor.domain.Contenido;
import org.constructor.service.dto.ContenidoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

// TODO: Auto-generated Javadoc
/**
 * The Interface ContenidoService.
 */
public interface ContenidoService {
	
	/**
	 * Save.
	 *
	 * @param contenido the contenido
	 * @return the contenido
	 */
	Contenido save(Contenido contenido);
	
	/**
	 * Update
	 * @param dto
	 * @return
	 * @throws Exception
	 */
	Optional<Contenido> updateContenido(ContenidoDTO dto) throws Exception;
	
	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	Page<Contenido> findAll(Pageable pageable);
	
	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	Optional<Contenido> findOne(Long id);
	
	/**
	 * Delete.
	 *
	 * @param id the id
	 */
	void delete(Long id);

}
