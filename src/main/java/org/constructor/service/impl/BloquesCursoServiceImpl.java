package org.constructor.service.impl;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.BloqueComponentes;
import org.constructor.domain.BloquesCurso;
import org.constructor.domain.Componente;
import org.constructor.domain.Contenido;
import org.constructor.domain.interactive.ActividadInteractiva;
import org.constructor.domain.module.NivelModulo;
import org.constructor.repository.BloqueComponentesRepository;
import org.constructor.repository.BloquesCursoRepository;
import org.constructor.repository.ComponenteRepository;
import org.constructor.repository.ContenidoRepository;
import org.constructor.repository.interactive.ActividadInteractivaRepository;
import org.constructor.repository.module.NivelModuloRepository;
import org.constructor.service.BloquesCursoService;
import org.constructor.service.dto.BloquesCursoDTO;
import org.constructor.service.dto.ComponenteDTO;
import org.constructor.service.dto.interactive.ActividadInteractivaDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * The Class BloquesCursoServiceImpl.
 */
@Service
@Transactional
public class BloquesCursoServiceImpl implements BloquesCursoService {
	
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(BloquesCursoServiceImpl.class);
	
	/** The bloques curso repository. */
	@Autowired
	private  BloquesCursoRepository bloquesCursoRepository;
	
	@Autowired
	private NivelModuloRepository nivelModuloRepository;
	
	@Autowired
	private BloqueComponentesRepository bloqueComponentesRepository;

	@Autowired
	private ComponenteRepository componenteRepository;
	
	@Autowired
	private ContenidoRepository contenidoRepository;
	
	@Autowired 
	private MultimediaService multimediaService;
	
	 @Autowired
	 private ActividadInteractivaRepository actividadInteractivaRepository;

	/**
	 * Save.
	 *
	 * @param bloquesCurso the bloques curso
	 * @return the bloques curso
	 */
	@Override
	public BloquesCurso save(BloquesCurso bloquesCurso) {
		
		return bloquesCursoRepository.save(bloquesCurso);
	}

	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	@Override
	public Page<BloquesCurso> findAll(Pageable pageable) {
		
		return bloquesCursoRepository.findAll(pageable);
	}

	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	@Override
	public Optional<BloquesCurso> findOne(Long id) {
		
		return bloquesCursoRepository.findById(id);
	}

	/**
	 * Delete.
	 *
	 * @param id the id
	 */
	@Override
	public void delete(Long id) {
		log.debug("Delete bloque_curso : {}", id);
		Optional.of(bloquesCursoRepository.findById(id))
			.filter(Optional::isPresent)
			.map(Optional::get)
			.map(bloque -> {
				bloque.getBloqueComponentes().getComponentes().stream().forEach(
						componente ->{
							log.debug("Delete bloque_curso : {}", componente.getTipoComponente().getNombre());
							if(!(componente.getTipoComponente().getNombre().equals("text") || componente.getTipoComponente().getNombre().equals("activity"))) {
								log.debug("Delete multimedia component");
								multimediaService.deleteFile(componente.getContenido().getContenido());
							}
						}
						);
				return bloque;
			});
		bloquesCursoRepository.deleteById(id);
	}

	/**
	 * Update.
	 *
	 * @param id the id
	 * @param bloquesCurso the bloques curso
	 * @return the bloques curso
	 */
	@Override
	public List<BloquesCurso> update(List<BloquesCursoDTO> bloquesCursoDTO) {
		List<BloquesCurso> listBloquesCurso = new ArrayList<>();
		for (BloquesCursoDTO bloqueCursoDTO : bloquesCursoDTO) {
			if (bloqueCursoDTO.getId() == null) {
				log.debug("Insert new bloque_curso : {}", bloqueCursoDTO);
				BloquesCurso newBloquesCurso = new BloquesCurso();
				BloqueComponentes bloqueComponentes = new BloqueComponentes();
				
				Optional<NivelModulo> nivelModulo = nivelModuloRepository.findById(bloqueCursoDTO.getNivelJerarquico().getNivelId());
				
				newBloquesCurso.setIndicadorOriginal(bloqueCursoDTO.getIndicadorOriginal());
				newBloquesCurso.setVisible(false);
				newBloquesCurso.setNivelModulo(nivelModulo.orElse(null));
				newBloquesCurso.setOrden(bloqueCursoDTO.getOrden());
				
				bloqueComponentes.setOrden(bloqueCursoDTO.getBloqueComponentes().getOrden());
				bloqueComponentes.setTipoBloqueComponentes(bloqueCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
				bloqueComponentesRepository.save(bloqueComponentes);
				
				for (ComponenteDTO componenteDTO : bloqueCursoDTO.getBloqueComponentes().getComponentes()) {
					//Guardando Componente y Contenido
					Componente componente = new Componente();
					
					componente.setBloqueComponentes(bloqueComponentes);
					componente.setOrden(componenteDTO.getOrden());
					componente.setTipoComponente(componenteDTO.getTipoComponente());
					componente.setVersion(componenteDTO.getVersion());
					componenteRepository.save(componente);
					if(componenteDTO.getActividadesInteractivas() != null)   {
						for (ActividadInteractivaDTO actividadInteractiva : componenteDTO.getActividadesInteractivas()) {
							ActividadInteractiva actv = new ActividadInteractiva();
							actv.setComponente(componente);
							actv.setContenido(actividadInteractiva.getContenido());
							actv.setEvaluable(actividadInteractiva.getEvaluable());
							actv.setGamificacion(actividadInteractiva.getGamificacion());
							actv.setIntentos(actividadInteractiva.getIntentos());
							actividadInteractivaRepository.save(actv);
						}
						
						
					}
					if(componenteDTO.getContenido() != null) {
						Contenido contenido = new Contenido();

					contenido.setComponente(componente);
					contenido.setContenido(componenteDTO.getContenido().getContenido());
					contenido.setNombre(componenteDTO.getContenido().getNombre());
					contenido.setExtension(componenteDTO.getContenido().getExtension());
					contenido.setPeso(componenteDTO.getContenido().getPeso());
					contenidoRepository.save(contenido);
					}
				}
				newBloquesCurso.setBloqueComponentes(bloqueComponentes);
				listBloquesCurso.add(bloquesCursoRepository.save(newBloquesCurso));

			} else {
				log.debug("Actualizando un bloquecurso: {}", bloqueCursoDTO.getId());
				 Optional.of(bloquesCursoRepository.findById(bloqueCursoDTO.getId())).filter(Optional::isPresent)
						.map(Optional::get).map(bloque -> {
							bloque.setOrden(bloqueCursoDTO.getOrden());
							bloque.setVisible(bloqueCursoDTO.getVisible());
							bloque.setIndicadorOriginal(bloqueCursoDTO.getIndicadorOriginal());
							listBloquesCurso.add(bloque);
							return bloque;
						});
			}
		}
		 Collections.sort(listBloquesCurso,
                 (a, b) -> a.getOrden().compareTo(b.getOrden()));
		return listBloquesCurso;
	}

}
