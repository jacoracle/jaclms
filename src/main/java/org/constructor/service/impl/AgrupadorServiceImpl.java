/**
 * 
 */
package org.constructor.service.impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.User;
import org.constructor.module.domain.Agrupador;
import org.constructor.module.domain.Etiqueta;
import org.constructor.repository.AgrupadorRepository;
import org.constructor.service.AgrupadorService;
import org.constructor.service.UserService;
import org.constructor.service.dto.AgrupadorDTO;
import org.constructor.service.dto.AgrupadorFiltroDTO;
import org.constructor.service.dto.AgrupadorUpdate;
import org.constructor.web.rest.errors.ErrorConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Edukai
 *
 */
@Service
@Transactional
public class AgrupadorServiceImpl implements AgrupadorService {

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

	/**
	 * Delete by id
	 */
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
	@Transactional(readOnly = true)

	public Page<Agrupador> findFirst20AgrupadorByOrderByIdDesc(Pageable pageable, Authentication authentication) {
		log.debug("Request to get all agrupador");
		List<Agrupador> agrupadorPage = null;
		List<Agrupador> agrupadorList = new ArrayList<>();
		User userName = new User();
		Set<User> user = new HashSet<>();
		String usuarioNombre = authentication.getName();
		Collection<? extends GrantedAuthority> a;
		a = authentication.getAuthorities();
		for (GrantedAuthority grantedAuthority : a) {
			if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
				return agrupadorRepository.findAll(pageable);
			}

		}
		log.debug("agrupador userrrrrr {}", a);
		user = userService.findUserByLogin(usuarioNombre);

		for (User usuario : user) {
			userName = usuario;

		}

		agrupadorPage = agrupadorRepository.findFirst20AgrupadorByOrderByIdDesc(pageable, userName.getId());
		for (Agrupador agrupador : agrupadorPage) {
			agrupador.setModulos(null);
			agrupadorList.add(agrupador);
		}
		return new PageImpl<>(agrupadorList);
	}

	/**
	 * Filter by Agrupador
	 */
	@Override
	public Set<Agrupador> findAgrupadorByTituloByDescripcionByEtiqueta(AgrupadorFiltroDTO dto) throws Exception {

		AgrupadorFiltroDTO agru = new AgrupadorFiltroDTO();
		Set<Agrupador> ag = new HashSet<>();
		if (dto.getTitulo() == null && dto.getDescripcion() == null && dto.getEtiqueta() == null) {
			throw new Exception(ErrorConstants.ERROR_FILTER);
		}
		agru = funtionFilterAgrupador(dto);

		if (agru.getTitulo() != null && agru.getDescripcion() != null && agru.getEtiqueta().equals("")) {
			ag = agrupadorRepository.findAgrupadorByTituloByDescripcion(dto.getTitulo(), dto.getDescripcion());
		} else {

			ag = agrupadorRepository.findAgrupadorByTituloByDescripcionByEtiqueta(agru.getTitulo(),
					agru.getDescripcion(), agru.getEtiqueta());
			log.debug("Agrupador filtro {}", ag);

		}

		return ag;
	}

	/**
	 * funtionFilter
	 * 
	 * @param dto
	 * @return
	 */
	@SuppressWarnings("unused")
	private AgrupadorFiltroDTO funtionFilterAgrupador(AgrupadorFiltroDTO dto) {

		if (dto.getTitulo() == null) {
			dto.setTitulo("");
		}
		if (dto.getDescripcion() == null) {
			dto.setDescripcion("");
		}

		if (dto.getEtiqueta() == null) {
			dto.setEtiqueta("");
		}

		return dto;

	}

	/**
	 * Update
	 */
	@Override
	public Optional<Agrupador> updateAgrupador(AgrupadorUpdate dto) throws Exception {
		return Optional.of(agrupadorRepository.findById(dto.getId())).filter(Optional::isPresent).map(Optional::get)
				.map(agrupador -> {
					agrupador.setId(dto.getId());
					agrupador.setTitulo(dto.getTitulo());
					agrupador.setDescripcion(dto.getDescripcion());

					agrupador.getEtiquetas().clear();

					Set<Etiqueta> listEtiquetas = new HashSet<>();

					dto.getEtiquetas().forEach(etiquetadto -> {
						Etiqueta etiquetas = new Etiqueta();

						etiquetas.setDescripcion(etiquetadto.getDescripcion());

						listEtiquetas.add(etiquetas);

					});
					agrupador.getEtiquetas().addAll(listEtiquetas);

					return agrupador;
				});
	}
}
