/**
 * 
 */
package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.module.domain.AgrupadorModulo;
import org.constructor.repository.AgrupadorModuloRepository;
import org.constructor.service.AgrupadorModuloService;
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
public class AgrupadorModuloServiceImpl implements AgrupadorModuloService {
	
	/**
	 * Logger  
	 */
	private final Logger log = LoggerFactory.getLogger(AgrupadorModuloServiceImpl.class);
	
	/**
	 * Repository   
	 */
	private final AgrupadorModuloRepository agrupadorModuloRepository;

	/**
	 * AgrupadorModuloServiceImpl
	 * 
	 * @param agrupadorModuloRepository
	 */
	public AgrupadorModuloServiceImpl(AgrupadorModuloRepository agrupadorModuloRepository) {
	        this.agrupadorModuloRepository = agrupadorModuloRepository;
	    }


	/**
	 * Save
	 */
	@Override
	public AgrupadorModulo save(AgrupadorModulo agrupadorModulo) {
		 log.debug("Request to save agrupadorModulo : {}", agrupadorModulo);
	        return agrupadorModuloRepository.save(agrupadorModulo);
	}
	

	/**
	 * findAll
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<AgrupadorModulo> findAll(Pageable pageable) {
	    log.debug("Request to get all agrupadorModulo");
        return agrupadorModuloRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<AgrupadorModulo> findOne(Long id) {
		log.debug("Request to get agrupadorModulo : {}", id);
        return agrupadorModuloRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request to delete agrupadorModulo : {}", id);
		agrupadorModuloRepository.deleteById(id);
		
	}

}
