package org.constructor.service.impl.rutas;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.repository.rutas.EstructuraJerarquicaRepository;
import org.constructor.service.rutas.EstructuraJerarquicaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Implementation for managing {@link EstructuraJerarquica}.
 */
@Service
@Transactional
public class EstructuraJerarquicaServiceImpl implements EstructuraJerarquicaService{
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(EstructuraJerarquicaServiceImpl.class);
	
	/**
	 * Repository
	 */
	private final EstructuraJerarquicaRepository estructuraJerarquicaRepository;
	
	/**
	 * EstructuraJerarquicaServiceImpl
	 * 
	 * @param estructuraJerarquicaRepository
	 */
	public EstructuraJerarquicaServiceImpl(EstructuraJerarquicaRepository estructuraJerarquicaRepository) {
        this.estructuraJerarquicaRepository = estructuraJerarquicaRepository;
    }

	/**
	 * Save
	 */
	@Override
	public EstructuraJerarquica save(EstructuraJerarquica estructuraJerarquica) {
		log.debug("Save estructuraJerarquica: {}", estructuraJerarquica);
		return estructuraJerarquicaRepository.save(estructuraJerarquica);
	}

	/**
	 * findAll
	 */
	@Override
	public List<EstructuraJerarquica> findAll(Pageable pageable) {
		estructuraJerarquicaRepository.findAll(pageable) ;
		return estructuraJerarquicaRepository.findAll(Sort.by("ordenNivel").ascending());
	}


	
	/**
	 * findOne
	 */
	@Override
	public Optional<EstructuraJerarquica> findOne(Long id) {
		return estructuraJerarquicaRepository.findById(id);
	}

	/**
	 * Delete by id 
	 */
	@Override
	public void delete(Long id) {
		estructuraJerarquicaRepository.deleteById(id);
	}

	/**
	 * findByEstructura
	 */
	@Override
	public Set<EstructuraJerarquica> findByNivel(Long id) {
		return estructuraJerarquicaRepository.findByEstructura(id);
	}

}
