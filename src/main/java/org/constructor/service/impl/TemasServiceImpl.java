/**
 * 
 */
package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.module.domain.Temas;
import org.constructor.repository.TemasRepository;
import org.constructor.service.TemasService;
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
public class TemasServiceImpl implements TemasService {

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TemasServiceImpl.class);
	
	/**
	 * Repository 
	 */
	private final TemasRepository temasRepository;
	
	/**
	 * TemasServiceImpl
	 * 
	 * @param temasRepository
	 */
	public TemasServiceImpl(TemasRepository temasRepository) {
        this.temasRepository = temasRepository;
    }
	
	/**
	 * Save
	 */
	@Override
	public Temas save(Temas temas) {
		log.debug("Request Service to save temas : {}",temas);
		return temasRepository.save(temas);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<Temas> findAll(Pageable pageable) {
		log.debug("Request service to get all temas");
		return temasRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<Temas> findOne(Long id) {
		log.debug("Request Service to get temas : {}",id);
		return temasRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete temas : {}",id);
		temasRepository.deleteById(id);
		
	}

}
