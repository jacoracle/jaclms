package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.domain.Telefono;
import org.constructor.repository.TelefonoRepository;
import org.constructor.service.TelefonoService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Telefono }.
 */

@Service
@Transactional
public class TelefonoServiceImpl implements TelefonoService {
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TelefonoServiceImpl.class);
	
	/**
	 * Repository 
	 */
	private final TelefonoRepository telefonoRepository;
	
	/**
	 * PhoneNumberServiceImpl
	 * 
	 * @param phoneNumberRepository
	 */
    public TelefonoServiceImpl(TelefonoRepository telefonoRepository) {
        this.telefonoRepository = telefonoRepository;
    }

    /**
     * Save
     */
	@Override
	public Telefono save(Telefono telefono) {
		log.debug("Request Service to save PhoneNumber : {}",telefono);
		return telefonoRepository.save(telefono);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<Telefono> findAll(Pageable pageable) {
		log.debug("Request Service to get all PhoneNumber");
		return telefonoRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<Telefono> findOne(Long id) {
		log.debug("Request Service to get PhoneNumber : {}",id);
		return telefonoRepository.findById(id);
	}

	/**
	 * Delete by id 
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete PhoneNumber : {}",id);
		telefonoRepository.deleteById(id);
	}

}
