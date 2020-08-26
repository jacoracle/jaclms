package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.repository.EstructuraJerarquicaRepository;
import org.constructor.service.EstructuraJerarquicaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EstructuraJerarquica}.
 */
@Service
@Transactional
public class EstructuraJerarquicaServiceImpl implements EstructuraJerarquicaService{
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(EstructuraJerarquicaServiceImpl.class);
	
	/**
	 * Repository
	 */
	private final EstructuraJerarquicaRepository estructuraJerarquicaRepository;
	
	/**
	 * EstructuraJerarquicaServiceImpl
	 * 
	 * @param estructuraJerarquicaRepository
	 */
	public EstructuraJerarquicaServiceImpl(EstructuraJerarquicaRepository estructuraJerarquicaRepository) {
        this.estructuraJerarquicaRepository = estructuraJerarquicaRepository;
    }

	/**
	 * Save
	 */
	@Override
	public EstructuraJerarquica save(EstructuraJerarquica estructuraJerarquica) {
		log.debug("Save estructuraJerarquica: {}", estructuraJerarquica);
		return estructuraJerarquicaRepository.save(estructuraJerarquica);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<EstructuraJerarquica> findAll(Pageable pageable) {
		return estructuraJerarquicaRepository.findAll(pageable) ;
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<EstructuraJerarquica> findOne(Long id) {
		return estructuraJerarquicaRepository.findById(id);
	}

	/**
	 * Delete by id 
	 */
	@Override
	public void delete(Long id) {
		estructuraJerarquicaRepository.deleteById(id);
	}

}
