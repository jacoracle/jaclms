package org.constructor.service.impl;

import java.util.Optional;


import org.constructor.domain.Contenido;
import org.constructor.repository.ContenidoRepository;
import org.constructor.service.ContenidoService;
import org.constructor.service.dto.ContenidoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


/**
 * The Class ContenidoServiceImpl.
 */
@Service
@Transactional
public class ContenidoServiceImpl implements ContenidoService {
	
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(ContenidoServiceImpl.class);
	
	
	
	/** The contenido repository. */
	@Autowired
	private ContenidoRepository contenidoRepository;

	/**
	 * Save.
	 *
	 * @param contenido the contenido
	 * @return the contenido
	 */
	@Override
	public Contenido save(Contenido contenido) {
		log.debug("Save Contenido: {}", contenido);
		return contenidoRepository.save(contenido);
	}

	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	@Override
	public Page<Contenido> findAll(Pageable pageable) {
		
		return contenidoRepository.findAll(pageable);
	}

	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	@Override
	public Optional<Contenido> findOne(Long id) {
		return contenidoRepository.findById(id);
	}

	/**
	 * Delete.
	 *
	 * 
	 */
	@Override
	public void delete (Long id) {
		 Optional.of(contenidoRepository
	            .findById(id))
	            .filter(Optional::isPresent)
	            .map(Optional::get)
	            .map( contenido -> {
	            	contenido.setContenido("");	
	            	contenido.setNombre("");
	            	contenido.setExtension("");
	            	contenido.setPeso(null);
	            	return contenido;
	            }
	            		);	
		
	
	
	}

	/**
	 * Update
	 */
	@Override
	public Optional<Contenido> updateContenido(ContenidoDTO dto) throws Exception {
		return Optional.of(contenidoRepository
	            .findById(dto.getId()))
	            .filter(Optional::isPresent)
	            .map(Optional::get)
	            .map( contenido -> {
	            	contenido.setId(dto.getId());
	            	contenido.setContenido(dto.getContenido());	
	            	contenido.setNombre(dto.getNombre());
	            	contenido.setExtension(dto.getExtension());
	            	contenido.setPeso(dto.getPeso());
	            	return contenido;
	            }
	            		);	
	}
		
}
