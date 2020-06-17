package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.domain.Pais;
import org.constructor.repository.PaisRepository;
import org.constructor.service.PaisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link Pais}.
 */
@Service
@Transactional
public class PaisServiceImpl implements PaisService {
	
	/**
	 * Logger 
	 */
	private final Logger log = LoggerFactory.getLogger(PaisServiceImpl.class);
	
	/**
	 * Repository
	 */
	private final PaisRepository paisRepository;
	
	/**
	 * CountryServiceImpl
	 * 
	 * @param countryRepository
	 */
    public PaisServiceImpl(PaisRepository paisRepository) {
        this.paisRepository = paisRepository;
    }

    /**
     * save
     */
	@Override
	public Pais save(Pais pais) {
		 log.debug("Request Service to save Country : {}",pais);
		return paisRepository.save(pais);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<Pais> findAll(Pageable pageable) {
		log.debug("Request Service to get all Countries");
		return paisRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<Pais> findOne(Long id) {
		log.debug("Request Service to get Country : {}",id);
		return paisRepository.findById(id);
	}

	/**
	 * Delete by id 
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete Country : {}",id);
		paisRepository.deleteById(id);
	}

}
