/**
 * 
 */
package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.interactive.domain.TipoActividadInteractiva;
import org.constructor.repository.TipoActividadInteractivaRepository;
import org.constructor.service.TipoActividadInteractivaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Edukai
 *
 */
@Service
@Transactional
public class TipoActividadInteractivaServiceImpl implements TipoActividadInteractivaService {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TipoActividadInteractivaServiceImpl.class);

	/**
	 * Repository
	 */
	private final TipoActividadInteractivaRepository tipoActividadInteractivaRepository;


	/**
	 * TipoActividadInteractivaServiceImpl
	 * 
	 * @param tipoActividadInteractivaRepository
	 */
	public TipoActividadInteractivaServiceImpl(TipoActividadInteractivaRepository tipoActividadInteractivaRepository) {
		this.tipoActividadInteractivaRepository = tipoActividadInteractivaRepository;
	}
	
	/**
	 * Save
	 */
	@Override
	public TipoActividadInteractiva save(TipoActividadInteractiva tipoActividadInteractiva) {
		log.debug("Request Service to save tipoActividadInteractiva : {}", tipoActividadInteractiva);
		return tipoActividadInteractivaRepository.save(tipoActividadInteractiva);
	}


	/**
	 * findAll
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<TipoActividadInteractiva> findAll(Pageable pageable) {
		log.debug("Request service to get all tipoActividadInteractiva");
		return tipoActividadInteractivaRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<TipoActividadInteractiva> findOne(Long id) {
		log.debug("Request Service to get TipoActividadInteractiva : {}", id);
		return tipoActividadInteractivaRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete TipoActividadInteractiva : {}", id);
		tipoActividadInteractivaRepository.deleteById(id);		
	}

}
