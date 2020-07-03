/**
 * 
 */
package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.domain.Modulo;
import org.constructor.repository.ModuloRepository;
import org.constructor.service.ModuloService;
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
public class ModuloServiceImpl  implements ModuloService{

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ModuloServiceImpl.class);
	
	/**
	 * Repository 
	 */
	private final ModuloRepository moduloRepository;
	
	/**
	 * ModuloServiceImpl
	 * 
	 * @param moduloRepository
	 */
	public ModuloServiceImpl(ModuloRepository moduloRepository) {
        this.moduloRepository = moduloRepository;
    }
	
	/**
	 * Save
	 */
	@Override
	public Modulo save(Modulo modulo) {
		log.debug("Request Service to save modulo : {}",modulo);
		return moduloRepository.save(modulo);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<Modulo> findAll(Pageable pageable) {
		log.debug("Request service to get all modulo");
		return moduloRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<Modulo> findOne(Long id) {
		log.debug("Request Service to get modulo : {}",id);
		return moduloRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete modulo : {}",id);
		moduloRepository.deleteById(id);
		
	}

}
