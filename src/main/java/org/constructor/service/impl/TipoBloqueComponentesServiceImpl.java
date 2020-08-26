package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.domain.TipoBloqueComponentes;
import org.constructor.repository.TipoBloqueComponentesRepository;
import org.constructor.service.TipoBloqueComponentesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link TipoBloqueComponente}.
 */
@Service
@Transactional
public class TipoBloqueComponentesServiceImpl implements TipoBloqueComponentesService {
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TipoBloqueComponentesServiceImpl.class);
	
	/**
	 * Repository 
	 */
	private final TipoBloqueComponentesRepository tipoBloqueComponentesRepository;
	
	/**
	 * TipoBloqueComponentesServiceImpl
	 * 
	 * @param tipoBloqueComponentesRepository
	 */
	public TipoBloqueComponentesServiceImpl(TipoBloqueComponentesRepository tipoBloqueComponentesRepository) {
        this.tipoBloqueComponentesRepository = tipoBloqueComponentesRepository;
    }

	/**
	 * Save
	 */
	@Override
	public TipoBloqueComponentes save(TipoBloqueComponentes tipoBloqueComponentes) {
		log.debug("Save tipoBloqueComponentes: {}", tipoBloqueComponentes);
		return tipoBloqueComponentesRepository.save(tipoBloqueComponentes);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<TipoBloqueComponentes> findAll(Pageable pageable) {
		return tipoBloqueComponentesRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<TipoBloqueComponentes> findOne(Long id) {
		
		return tipoBloqueComponentesRepository.findById(id);
	}

	/**
	 * Delete by id
	 */
	@Override
	public void delete(Long id) {
		tipoBloqueComponentesRepository.deleteById(id);
	}

}
