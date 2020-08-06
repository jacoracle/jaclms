/**
 * 
 */
package org.constructor.service.impl;

import java.io.IOException;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.User;
import org.constructor.module.domain.Modulo;
import org.constructor.multimedia.response.VideoResponse;
import org.constructor.repository.ModuloRepository;
import org.constructor.service.ModuloService;
import org.constructor.service.UserService;
import org.constructor.service.dto.ModuloDTO;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.service.multimedia.impl.MultimediaServiceImpl;
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
	 * multimediaServiceImpl
	 */
	@Autowired
	private MultimediaServiceImpl multimediaServiceImpl;

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
	 * @throws IOException 
	 */
	@Override
	public void delete(Long id) throws IOException {
		log.debug("Request Service to delete modulo : {}", id);
		moduloRepository.deleteById(id);
		String carpeta = "Modulo-" + id;
		boolean bandera = multimediaServiceImpl.deleteDirectory(carpeta);
		log.debug("Request Service to delete bandera : {}", bandera);

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

}
