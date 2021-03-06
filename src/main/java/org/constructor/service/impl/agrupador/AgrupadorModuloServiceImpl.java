/**
 * 
 */
package org.constructor.service.impl.agrupador;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.agrupador.AgrupadorModulo;
import org.constructor.repository.agrupador.AgrupadorModuloRepository;
import org.constructor.service.agrupador.AgrupadorModuloService;
import org.constructor.service.dto.agrupador.UpdateAgrupadorDTO;
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


	/**
	 * updateAgrupadorModulo
	 */
	@Override
	public  List<AgrupadorModulo> updateAgrupadorModulo(List<UpdateAgrupadorDTO> dto) throws Exception {
		
		     List<AgrupadorModulo>  agrupadorModulo = new ArrayList<>(new LinkedHashSet<AgrupadorModulo>());
		
		for (UpdateAgrupadorDTO updateDto : dto) {
		    Optional.of(agrupadorModuloRepository.findById(updateDto.getId()))
			 .filter(Optional::isPresent)
	            .map(Optional::get)
	            .map( agrupador -> {
	            
	            	agrupador.setOrden(updateDto.getOrden());
	            	agrupadorModulo.clear();
	            	agrupadorModulo.add(agrupador);
	        		log.debug("Request to   : {}", agrupador);

	            return agrupador;
	            }
	            		);	
		
		}
		log.debug("Request to hahshahsas   : {}", agrupadorModulo);

		return agrupadorModulo;
	
		
	}
	

}
