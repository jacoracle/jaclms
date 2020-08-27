package org.constructor.service.impl;

import org.constructor.service.RolesColaboradoresService;
import org.constructor.domain.RolesColaboradores;
import org.constructor.repository.RolesColaboradoresRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

/**
 * Service Implementation for managing {@link RolesColaboradores}.
 */
@Service
@Transactional
public class RolesColaboradoresServiceImpl implements RolesColaboradoresService {

	/**
	 * Logger
	 */
    private final Logger log = LoggerFactory.getLogger(RolesColaboradoresServiceImpl.class);

    /**
     * Repository 
     */
    private final RolesColaboradoresRepository rolesColaboradoresRepository;

    /**
     * RolesColaboradoresServiceImpl
     * 
     * @param rolesColaboradoresRepository
     */
    public RolesColaboradoresServiceImpl(RolesColaboradoresRepository rolesColaboradoresRepository) {
        this.rolesColaboradoresRepository = rolesColaboradoresRepository;
    }

    /**
     * Save
     */
	@Override
	public RolesColaboradores save(RolesColaboradores rolColaborador) {
		log.debug("Save rolColaborador: {}", rolColaborador);
		return rolesColaboradoresRepository.save(rolColaborador);
	}

	/**
	 * findAll
	 */
	@Override
	public Page<RolesColaboradores> findAll(Pageable pageable) {
		return rolesColaboradoresRepository.findAll(pageable);
	}

	/**
	 * findOne
	 */
	@Override
	public Optional<RolesColaboradores> findOne(Long id) {
		return rolesColaboradoresRepository.findById(id);
	}

	/**
	 * Delete by id 
	 */
	@Override
	public void delete(Long id) {
		rolesColaboradoresRepository.deleteById(id);
	}
	
}
