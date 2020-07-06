package org.constructor.service;

import java.util.List;
import java.util.Optional;

import org.constructor.domain.BloquesCurso;
import org.constructor.service.dto.BloquesCursoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * The Interface BloquesCursoService.
 */
public interface BloquesCursoService {
	
	/**
	 * Save.
	 *
	 * @param bloquesCurso the bloquesCurso
	 * @return the bloques curso
	 */
	BloquesCurso save(BloquesCurso bloquesCurso);
	
	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	Page<BloquesCurso> findAll(Pageable pageable);
	
	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	Optional<BloquesCurso> findOne(Long id);
	
	/**
	 * Delete.
	 *
	 * @param id the id
	 */
	void delete(Long id);

	
	/**
	 * Update.
	 *
	 * @param bloquesCursoDTO the bloques curso DTO
	 * @return the list
	 */
	List<BloquesCurso> update(List<BloquesCursoDTO> bloquesCursoDTO);
	
}
