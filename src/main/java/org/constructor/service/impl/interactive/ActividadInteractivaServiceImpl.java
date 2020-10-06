/**
 * 
 */
package org.constructor.service.impl.interactive;

import java.util.Optional;

import org.constructor.domain.interactive.ActividadInteractiva;
import org.constructor.domain.interactive.TipoActividadInteractiva;
import org.constructor.repository.interactive.ActividadInteractivaRepository;
import org.constructor.service.dto.interactive.ActividadInteractivaDTO;
import org.constructor.service.interactive.ActividadInteractivaService;
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
public class ActividadInteractivaServiceImpl implements ActividadInteractivaService{

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ActividadInteractivaServiceImpl.class);

	/**
	 * Repository
	 */
	private final ActividadInteractivaRepository actividadInteractivaRepository;


	/**
	 * ActividadInteractivaServiceImpl
	 * 
	 * @param actividadInteractivaRepository
	 */
	public ActividadInteractivaServiceImpl(ActividadInteractivaRepository actividadInteractivaRepository) {
		this.actividadInteractivaRepository = actividadInteractivaRepository;
	}
	
	/**
	 * Save
	 */
	@Override
	public ActividadInteractiva save(ActividadInteractiva actividadInteractiva) {
		log.debug("Request Service to save ActividadInteractiva : {}", actividadInteractiva);
		return actividadInteractivaRepository.save(actividadInteractiva);
	}

	/**
	 * findAll
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<ActividadInteractiva> findAll(Pageable pageable) {
		log.debug("Request service to get all ActividadInteractiva");
		return actividadInteractivaRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
    @Transactional(readOnly = true)
	public Optional<ActividadInteractiva> findOne(Long id) {
		log.debug("Request Service to get ActividadInteractiva : {}", id);
		return actividadInteractivaRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	@Transactional
	public void delete(Long id) {
		log.debug("Request Service to delete ActividadInteractiva : {}", id);
		actividadInteractivaRepository.deleteById(id);
		
	}

	/**
	 *  updateActividadInteractiva
	 */
	@Override
	public Optional<ActividadInteractiva> updateActividad(ActividadInteractivaDTO dto) throws Exception {
		log.debug("Request Service id  : {}", dto.getId());

		return Optional.of(actividadInteractivaRepository
	            .findById(dto.getId()))
	            .filter(Optional::isPresent)
	            .map(Optional::get)
	            .map( actividadInteractiva -> {
	            	log.debug("Request Service actividadInteractivasssss  : {}", actividadInteractiva);
	            	actividadInteractiva.setId(dto.getId());
	            	TipoActividadInteractiva tipoActividadInteractiva =  new TipoActividadInteractiva();
	        		tipoActividadInteractiva = 	actividadInteractivaRepository.getTipoActividadId(dto.getTipoActividadInteractiva().getTipoActividad(), 
	        				dto.getTipoActividadInteractiva().getSubtipo(), 
	        				dto.getTipoActividadInteractiva().getOpcion());
	        		actividadInteractiva.setNombre(dto.getNombre());
	            	actividadInteractiva.setContenido(dto.getContenido());
	            	actividadInteractiva.setEvaluable(dto.getEvaluable());
	            	actividadInteractiva.setIntentos(dto.getIntentos());
	            	actividadInteractiva.setGamificacion(dto.getGamificacion());
	            	actividadInteractiva.setTipoActividadInteractiva(tipoActividadInteractiva);
	        	

	            	return actividadInteractiva;
	            }
	            		);	
	}

}
