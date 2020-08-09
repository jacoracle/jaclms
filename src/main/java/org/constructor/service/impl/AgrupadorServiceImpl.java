/**
 * 
 */
package org.constructor.service.impl;

import java.util.Optional;

import org.constructor.module.domain.Agrupador;
import org.constructor.repository.AgrupadorRepository;
import org.constructor.service.AgrupadorService;
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
public class AgrupadorServiceImpl  implements AgrupadorService{

	
	/**
	 * Logger  
	 */
	private final Logger log = LoggerFactory.getLogger(AgrupadorServiceImpl.class);
	
	/**
	 * Repository   
	 */
	private final AgrupadorRepository agrupadorRepository;

	/**
	 * AgrupadorServiceImpl
	 * 
	 * @param agrupadorRepository
	 */
	public AgrupadorServiceImpl(AgrupadorRepository agrupadorRepository) {
	        this.agrupadorRepository = agrupadorRepository;
	    }

	/**
	 * Save
	 */
	@Override
	@Transactional
	public Agrupador save(Agrupador agrupador) {
		 log.debug("Request to save agrupador : {}", agrupador);
	        return agrupadorRepository.save(agrupador);
	}

	/**
	 * findAll
	 */
	@Override
    @Transactional(readOnly = true)
	public Page<Agrupador> findAll(Pageable pageable) {
		 log.debug("Request to get all agrupador");
	        return agrupadorRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<Agrupador> findOne(Long id) {
		log.debug("Request to get agrupador : {}", id);
        return agrupadorRepository.findById(id);
	}

	@Override
	public void delete(Long id) {
		log.debug("Request to delete agrupador : {}", id);
		agrupadorRepository.deleteById(id);
		
	}

}
