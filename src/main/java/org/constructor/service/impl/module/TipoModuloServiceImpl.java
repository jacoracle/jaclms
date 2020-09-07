/**
 * 
 */
package org.constructor.service.impl.module;

import java.util.Optional;

import org.constructor.domain.module.TipoModulo;
import org.constructor.repository.module.TipoModuloRepository;
import org.constructor.service.module.TipoModuloService;
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
public class TipoModuloServiceImpl  implements TipoModuloService{

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TipoModuloServiceImpl.class);
	
	/**
	 * Repository 
	 */
	private final TipoModuloRepository tipoModuloRepository;
	
	/**
	 * TipoModuloServiceImpl
	 * 
	 * @param tipoModuloRepository
	 */
	public TipoModuloServiceImpl(TipoModuloRepository tipoModuloRepository) {
        this.tipoModuloRepository = tipoModuloRepository;
    }
	
	/**
	 * Save
	 */
	@Override
	public TipoModulo save(TipoModulo tipoModulo) {
		log.debug("Request Service to save TipoModulo : {}",tipoModulo);
		return tipoModuloRepository.save(tipoModulo);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<TipoModulo> findAll(Pageable pageable) {
		log.debug("Request service to get all TipoModulo");
		return tipoModuloRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<TipoModulo> findOne(Long id) {
		log.debug("Request Service to get TipoModulo : {}",id);
		return tipoModuloRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete TipoModulo : {}",id);
		tipoModuloRepository.deleteById(id);
		
	}

}
