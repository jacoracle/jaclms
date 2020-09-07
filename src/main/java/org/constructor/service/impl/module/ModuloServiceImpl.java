/**
 * 
 */
package org.constructor.service.impl.module;

import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.User;
import org.constructor.domain.module.Modulo;
import org.constructor.multimedia.response.VideoResponse;
import org.constructor.repository.module.ModuloRepository;
import org.constructor.service.UserService;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.dto.module.ModuloDTO;
import org.constructor.service.dto.module.ModuloFiltroDTO;
import org.constructor.service.module.ModuloService;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.web.rest.errors.ErrorConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
public class ModuloServiceImpl implements ModuloService {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ModuloServiceImpl.class);

	/**
	 * Repository
	 */
	private final ModuloRepository moduloRepository;

	/**
	 * MultimediaService
	 */
	@Autowired
	private MultimediaService multimediaService;

	/**
	 * Service UserService
	 */
	@Autowired
	private UserService userService;

	/**
	 * ModuloServiceImpl
	 * 
	 * @param moduloRepository
	 */
	public ModuloServiceImpl(ModuloRepository moduloRepository) {
		this.moduloRepository = moduloRepository;
	}

	/**
	 * Save
	 */
	@Override
	public Modulo save(Modulo modulo) {
		log.debug("Request Service to save modulo : {}", modulo);
		return moduloRepository.save(modulo);
	}

	/**
	 * findAll
	 */
	@Override
	@Transactional(readOnly = true)
	public Page<Modulo> findAll(Pageable pageable) {
		log.debug("Request service to get all modulo");
		return moduloRepository.findAll(pageable);
	}

	/**
	 * findAllModuloUserId
	 * 
	 */
	@Override
	@Transactional(readOnly = true)
	public List<Modulo> findAllModuloUserId(Authentication authentication) {
		log.debug("Request to get all Modulos by User ");
		Set<User> user = new HashSet<>();
		User userName = new User();

		// Get userbyLogin
		String usuarioNombre = authentication.getName();
		Collection<? extends GrantedAuthority> a;
		a = authentication.getAuthorities();
		for (GrantedAuthority grantedAuthority : a) {
			if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
				return moduloRepository.findAll();
			}

		}
		user = userService.findUserByLogin(usuarioNombre);

		for (User usuario : user) {
			userName = usuario;
		}
		return moduloRepository.findAllModuloUserId(userName.getId());
	}
	

	/**
	 * findOne
	 */
	@Override
	@Transactional(readOnly = true)
	public Optional<Modulo> findOne(Long id) {
		log.debug("Request Service to get modulo : {}", id);
		return moduloRepository.findById(id);
	}

	/**
	 * Delete
	 */
	@Override
	public void delete(Long id) {
		log.debug("Request Service to delete modulo : {}", id);
		moduloRepository.deleteById(id);

	}

	/**
	 * save
	 */
	@Override
	@Transactional
	public ModuloDTO save(Authentication authentication, Modulo modulo) {
		log.debug("Request to save Modulo : {}", modulo);
		ModuloDTO mo = new ModuloDTO();

		String usuarioNombre = authentication.getName();
		Set<User> user = userService.findUserByLogin(usuarioNombre);

		// Insert module whit module
		modulo.setUser(user);
		modulo = moduloRepository.save(modulo);

		MultimediaDTO multimediaDTO = new MultimediaDTO();
		String identificador = "Module-" + modulo.getId();
		multimediaDTO.setId(identificador);
		VideoResponse<?> respuesta = multimediaService.saveFile(multimediaDTO);
		respuesta.getPath();

		log.debug("modulo id {}", modulo.getId());
		mo.setModulo(modulo);

		return mo;
	}

	/**
	 * seeker
	 */
	@Override
	@Transactional(readOnly = true)
	public Set<Modulo> findModuloByFiltros(ModuloFiltroDTO dto) throws Exception {
		ModuloFiltroDTO modu = new ModuloFiltroDTO();
		Set<Modulo> mod = new HashSet<>();
		if (dto.getTitulo() == null && dto.getDescripcion() == null && dto.getAsignatura() == null
				&& dto.getNumeroGrados() == null && dto.getTemas() == null) {
			throw new Exception(ErrorConstants.ERROR_FILTER);
		}

		modu = funtionFilter(dto);
		if (modu.getTitulo() != null && modu.getDescripcion() != null && modu.getAsignatura().equals("")
				&& modu.getNumeroGrados().equals("") && modu.getTemas().equals("")) {
			mod = moduloRepository.findModuloByTituloByDescripcion(dto.getTitulo(), dto.getDescripcion());
		} else {

			mod = moduloRepository.findModuloByTituloByDescripcionByNumeroGrados(modu.getTitulo(),
					modu.getDescripcion(), modu.getAsignatura(), modu.getNumeroGrados(), modu.getTemas());
			log.debug("modulo {}", mod);

		}

		return mod;
	}


    /**
     * findModuloByTituloByDescripcion
     */
    @Override
    public Set<Modulo> findModuloByTituloByDescripcion(ModuloFiltroDTO dto) {
        return moduloRepository.findModuloByTituloByDescripcion(dto.getTitulo(), dto.getDescripcion());
    }

	/**
	 * funtionFilter
	 * @param dto
	 * @return
	 */
	@SuppressWarnings("unused")
	private ModuloFiltroDTO funtionFilter(ModuloFiltroDTO dto) {

		if (dto.getTitulo() == null) {
			dto.setTitulo("");
		}
		if (dto.getDescripcion() == null) {
			dto.setDescripcion("");
		}

		if (dto.getAsignatura() == null) {
			dto.setAsignatura("");
		}
		if (dto.getNumeroGrados() == null) {
			dto.setNumeroGrados("");
		}
		if (dto.getTemas() == null) {
			dto.setTemas("");
		}
		return dto;

	}

}
