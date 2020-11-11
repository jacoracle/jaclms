/**
 * 
 */
package org.constructor.service.impl.rutas;

import java.io.File;
import java.util.Collection;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;


import org.constructor.domain.User;
import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.domain.rutas.NivelRuta;
import org.constructor.domain.rutas.RutasAprendizaje;
import org.constructor.multimedia.response.VideoResponse;
import org.constructor.repository.rutas.NivelJerarquicoRepository;
import org.constructor.repository.rutas.NivelRutaRepository;
import org.constructor.repository.rutas.RutasAprendizajeRepository;
import org.constructor.service.UserService;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.dto.rutas.RutasAprendizajeDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.service.rutas.RutasAprendizajeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Edukai
 *
 */
@Service
@Transactional
public class RutasAprendizajeServiceImpl  implements RutasAprendizajeService{
	
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(RutasAprendizajeServiceImpl.class);
	
	/**
	 * RutasAprendizajeRepository
	 */
	private final RutasAprendizajeRepository rutasAprendizajeRepository;
	
	
	/**
	 * Service UserService
	 */
	@Autowired
	private UserService userService;
	
	/**
	 * MultimediaService
	 */
	@Autowired
	private MultimediaService multimediaService;
	
	@Autowired
	private NivelRutaRepository nivelRutasRepository;
	
	@Autowired
	private NivelJerarquicoRepository nivelJerarquicoRepository;
	
	/**
	 * RutasAprendizajeServiceImpl.
	 *
	 * @param rutasAprendizajeRepository the rutas aprendizaje repository
	 */
	public RutasAprendizajeServiceImpl(RutasAprendizajeRepository rutasAprendizajeRepository) {
        this.rutasAprendizajeRepository = rutasAprendizajeRepository;
    }
	

	/**
	 * Save  RutasAprendizaje
	 */
	@Override
	public RutasAprendizaje save(RutasAprendizaje rutasAprendizaje) {
		return rutasAprendizajeRepository.save(rutasAprendizaje);
	}

	/**
	 * finAll RutasAprendizaje
	 */
	@Override
	public Page<RutasAprendizaje> findAll(Pageable pageable) {
		return rutasAprendizajeRepository.findAll(pageable) ;
	}

	/**
	 * finOne RutasAprendizaje
	 */
	@Override
	public Optional<RutasAprendizaje> findOne(Long id) {
		return rutasAprendizajeRepository.findById(id);
	}

	/**
	 * Delete RutasAprendizaje
	 */
	@Override
	public void delete(Long id) {
		rutasAprendizajeRepository.deleteById(id);
	}


	/**
	 * Save to user
	 */
	@Override
	public RutasAprendizaje save(Authentication authentication, RutasAprendizaje rutasDTO, MultipartFile file) {
		log.debug("Request to save Ruta : {}", rutasDTO);
		RutasAprendizajeDTO ruta = new RutasAprendizajeDTO();
		
		String usuarioNombre = authentication.getName();
		Set<User> user = userService.findUserByLogin(usuarioNombre);

		// Insert rute whit rute
		rutasDTO.setUser(user);
		rutasDTO = rutasAprendizajeRepository.save(rutasDTO);
		
		if (file != null) {
			// Save PortadaUrl
			MultimediaDTO multimediaDTO = new MultimediaDTO();
			String identificador = "Rutas" + File.separator+ "Ruta-" + rutasDTO.getId();
			multimediaDTO.setFile(file);
			multimediaDTO.setId(identificador);
			VideoResponse<?> respuesta = multimediaService.saveFile(multimediaDTO);
			rutasDTO.setPortadaUrl(respuesta.getPath());
		}
		NivelJerarquico nivelJerarquico = new NivelJerarquico();
		nivelJerarquico.setNombre("Nivel_1"); 
		nivelJerarquico.setImagenUrl("");
		nivelJerarquicoRepository.save(nivelJerarquico);
		
		NivelRuta nivelRuta = new NivelRuta();
		nivelRuta.setNivelJerarquico(nivelJerarquico);
		nivelRuta.setRutasAprendizaje(rutasDTO);
		nivelRuta.setOrden(0l);
		
		nivelRutasRepository.save(nivelRuta);
		
		log.debug("ruta id {}", rutasDTO.getId());
		ruta.setRutasAprendizaje(rutasDTO);

		return rutasDTO;
	}


	/**
	 * findAllRutaUserId
	 */
	@Override
	public List<RutasAprendizaje> findAllRutaUserId(Authentication authentication) {
		log.debug("Request to get all RutasAprendizaje by User ");
		Set<User> user = new HashSet<>();
		User userName = new User();

		// Get userbyLogin
		String usuarioNombre = authentication.getName();
		Collection<? extends GrantedAuthority> a;
		a = authentication.getAuthorities();
		for (GrantedAuthority grantedAuthority : a) {
			if (grantedAuthority.getAuthority().equals("ROLE_ADMIN")) {
				return rutasAprendizajeRepository.findAll();
			}

		}
		user = userService.findUserByLogin(usuarioNombre);

		for (User usuario : user) {
			userName = usuario;
		}
		return rutasAprendizajeRepository.findAllRutaUserId(userName.getId());
	}

}