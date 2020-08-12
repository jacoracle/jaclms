/**
 * 
 */
package org.constructor.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.User;
import org.constructor.module.domain.Agrupador;
import org.constructor.repository.AgrupadorRepository;
import org.constructor.service.AgrupadorService;
import org.constructor.service.UserService;
import org.constructor.service.dto.AgrupadorDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
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
	 * Service UserService
	 */
	@Autowired
	private UserService userService;

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

	/**
	 * findAllAgrupadorUserId
	 */
	@Override
	@Transactional(readOnly = true)
	public List<Agrupador> findAllAgrupadorUserId(Authentication authentication) {
		log.debug("Request to get all Agrupador by User ");
		Set<User> user = new HashSet<>();
		User userName = new User();

		// Get userbyLogin
		String usuarioNombre = authentication.getName(); 
		user = userService.findUserByLogin(usuarioNombre);

		for (User usuario : user) {
			userName = usuario;
		}
		return agrupadorRepository.findAllAgrupadorUserId(userName.getId());
	}

	/**
	 * Save user
	 */
	@Override
	@Transactional
	public AgrupadorDTO save(Authentication authentication, Agrupador agrupador) {
		log.debug("Request to save agrupador : {}", agrupador);
		AgrupadorDTO agrup = new AgrupadorDTO();

		String usuarioNombre = authentication.getName();
		Set<User> user = userService.findUserByLogin(usuarioNombre);

		agrupador.setUser(user);
		agrupador = agrupadorRepository.save(agrupador);
		log.debug("agrupador id {}", agrupador.getId());
		agrup.setAgrupador(agrupador);
		
		return agrup;
	}

	/**
	 * Get service for the last 10
	 */
	@Override
	public Page<Agrupador> findFirst20AgrupadorByOrderByIdDesc(Pageable pageable) {
		 log.debug("Request to get all agrupador");

	        return agrupadorRepository.findFirst20AgrupadorByOrderByIdDesc(pageable);
	}





}
