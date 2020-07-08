package org.constructor.service.impl;

import java.util.Optional;
import java.util.stream.Collectors;

import org.constructor.domain.BloqueComponentes;
import org.constructor.domain.BloquesCurso;
import org.constructor.domain.Componente;
import org.constructor.domain.Contenido;
import org.constructor.domain.Curso;
import org.constructor.domain.NivelJerarquico;
import org.constructor.domain.NivelesCurso;
import org.constructor.repository.BloqueComponentesRepository;
import org.constructor.repository.BloquesCursoRepository;
import org.constructor.repository.ComponenteRepository;
import org.constructor.repository.ContenidoRepository;
import org.constructor.repository.CursoRepository;
import org.constructor.repository.NivelJerarquicoRepository;
import org.constructor.repository.NivelesCursoRepository;
import org.constructor.response.NivelJerarquicoResponse;
import org.constructor.service.NivelJerarquicoService;
import org.constructor.service.dto.BloquesCursoDTO;
import org.constructor.service.dto.ComponenteDTO;
import org.constructor.service.dto.NivelJerarquicoDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * Service Implementation for managing {@link NivelJerarquico}.
 */
@Service
@Transactional
public class NivelJerarquicoServiceImpl  implements NivelJerarquicoService {
	
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(NivelJerarquicoServiceImpl.class);
	
	 /** The nivel jerarquico repository. */
 	private final NivelJerarquicoRepository nivelJerarquicoRepository;
	 
	 /** The bloque componentes repository. */
 	@Autowired
	 private BloqueComponentesRepository bloqueComponentesRepository;
	 
	 /** The componente repository. */
 	@Autowired
	 private ComponenteRepository componenteRepository;
	 	 
	 /** The curso repository. */
 	@Autowired
	 private CursoRepository cursoRepository;
	 
	 /** The niveles curso repository. */
 	@Autowired
	 private NivelesCursoRepository nivelesCursoRepository;
 	
 	/** The bloques curso repository. */
	 @Autowired
 	private BloquesCursoRepository bloquesCursoRepository;
 	
	 @Autowired
	 private ContenidoRepository contenidoRepository;
	 
	 
	 
	    /**
    	 * Instantiates a new nivel jerarquico service impl.
    	 *
    	 * @param nivelJerarquicoRepository the nivel jerarquico repository
    	 */
    	public NivelJerarquicoServiceImpl(NivelJerarquicoRepository nivelJerarquicoRepository) {
	        this.nivelJerarquicoRepository = nivelJerarquicoRepository;
	    }

	/**
	 * Save.
	 *
	 * @param nivelJerarquicoDTO the nivel jerarquico DTO
	 * @return the nivel jerarquico
	 * @throws Exception the exception
	 */
	@Override
	@Transactional
	public NivelJerarquico save(NivelJerarquicoDTO nivelJerarquicoDTO) throws Exception {
		
		//Guardando NivelJerarquico
		NivelJerarquico nivelJerarquico = new NivelJerarquico();
		nivelJerarquico.setNombre(nivelJerarquicoDTO.getNombre());
		nivelJerarquico.setTipo(nivelJerarquicoDTO.getTipo());
		nivelJerarquico.setInformacionAdicional(nivelJerarquicoDTO.getInformacionAdicional());
		nivelJerarquicoRepository.save(nivelJerarquico);
		
		log.debug("Se guardó correctamente el nivelJerarquico: {}", nivelJerarquico);
		
		for (BloquesCursoDTO bloquesCursoDTO : nivelJerarquicoDTO.getBloquesCurso()) {
			//Guardando BloquesCurso y BloqueComponentes
			BloquesCurso bloquesCurso = new BloquesCurso();
			BloqueComponentes bloqueComponentes = new BloqueComponentes();
			bloquesCurso.setIndicadorOriginal(bloquesCursoDTO.getIndicadorOriginal());
			bloquesCurso.setMostrar(bloquesCursoDTO.getMostrar());
			bloquesCurso.setNivelJerarquico(nivelJerarquico);
			bloquesCurso.setOrden(bloquesCursoDTO.getOrden());
			
			bloqueComponentes.setOrden(bloquesCursoDTO.getBloqueComponentes().getOrden());
			bloqueComponentes.setTipoBloqueComponentes(bloquesCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
			bloqueComponentesRepository.save(bloqueComponentes);
			
			for (ComponenteDTO componenteDTO : bloquesCursoDTO.getBloqueComponentes().getComponentes()) {
				//Guardando Componente y Contenido
				Componente componente = new Componente();
				Contenido contenido = new Contenido();
				componente.setBloqueComponentes(bloqueComponentes);
				componente.setOrden(componenteDTO.getOrden());
				componente.setTipoComponente(componenteDTO.getTipoComponente());
				componente.setVersion(componenteDTO.getVersion());
				componenteRepository.save(componente);
				
				contenido.setComponente(componente);
				contenido.setContenido(componenteDTO.getContenido().getContenido());
				contenido.setNombre(componenteDTO.getContenido().getNombre());
				contenido.setExtension(componenteDTO.getContenido().getExtension());
				contenido.setPeso(componenteDTO.getContenido().getPeso());
				contenidoRepository.save(contenido);
				
			}
			bloquesCurso.setBloqueComponentes(bloqueComponentes);
			bloquesCursoRepository.save(bloquesCurso);
			
			
			
		}
				
		//Guardando NivelesCurso
		Optional<Curso> curso = cursoRepository.findById(nivelJerarquicoDTO.getCursoId());
		if (curso.isPresent()) {
			log.debug("Curso: {}", curso.get());
			NivelesCurso nivelesCurso = new NivelesCurso();
			nivelesCurso.setCurso(curso.get());
			nivelesCurso.setNivelJerarquico(nivelJerarquico);
			nivelesCurso.setOrdenNivel(nivelJerarquicoDTO.getOrden());
			nivelesCursoRepository.save(nivelesCurso);
			log.debug("Se guardó correctamente nivelesCurso: {}", nivelesCurso);
		}else {
			throw new Exception("cursoId not found");
		}
		return nivelJerarquico;
	}
	
	
	 /**
 	 * Update nivel jerarquico.
 	 *
 	 * @param nivelJerarquicoDTO the nivel jerarquico DTO
 	 * @return the optional
 	 * @throws Exception the exception
 	 */
 	public Optional<NivelJerarquico> updateNivelJerarquico(NivelJerarquicoDTO nivelJerarquicoDTO) throws Exception{
 				 
		return Optional.of(nivelJerarquicoRepository
		            .findById(nivelJerarquicoDTO.getNivelId()))
		            .filter(Optional::isPresent)
		            .map(Optional::get)
		            .map( nivel -> {
		            	nivel.getBloquesCurso().stream().collect(Collectors.toSet()).forEach(
		            			bloqueCurso -> {
		            				log.debug("Eliminando bloques: {}", bloqueCurso.getId());
		            				bloquesCursoRepository.deleteById(bloqueCurso.getId());
		            			}
		            			);
		            	nivel.setNombre(nivelJerarquicoDTO.getNombre());
		            	nivel.setInformacionAdicional(nivelJerarquicoDTO.getInformacionAdicional());
		            	nivel.setTipo(nivelJerarquicoDTO.getTipo());
		            	nivelJerarquicoDTO.getBloquesCurso().stream().forEach(
		            			bloqueCursoDTO -> {
		            				BloquesCurso bloquesCurso = new BloquesCurso();
		            				BloqueComponentes bloqueComponentes = new BloqueComponentes();
		            				bloquesCurso.setIndicadorOriginal(bloqueCursoDTO.getIndicadorOriginal());
		            				bloquesCurso.setMostrar(bloqueCursoDTO.getMostrar());
		            				bloquesCurso.setOrden(bloqueCursoDTO.getOrden());
		            				bloquesCurso.setNivelJerarquico(nivel);
		            				
		            				bloqueComponentes.setOrden(bloqueCursoDTO.getBloqueComponentes().getOrden());
		            				bloqueComponentes.setTipoBloqueComponentes(bloqueCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
		            				bloqueComponentesRepository.save(bloqueComponentes);
		            				
		            				bloqueCursoDTO.getBloqueComponentes().getComponentes().stream().forEach(
		            						componenteDTO -> {
		            							Componente componente = new Componente();
		            							Contenido contenido = new Contenido();
		            							
		            							componente.setBloqueComponentes(bloqueComponentes);
		            							componente.setOrden(componenteDTO.getOrden());
		            							componente.setTipoComponente(componenteDTO.getTipoComponente());
		            							componente.setVersion(componenteDTO.getVersion());
		            							componenteRepository.save(componente);
		            							
		            							contenido.setComponente(componente);
		            							contenido.setContenido(componenteDTO.getContenido().getContenido());
		            							contenido.setNombre(componenteDTO.getContenido().getNombre());
		            							contenido.setExtension(componenteDTO.getContenido().getExtension());
		            							contenido.setPeso(componenteDTO.getContenido().getPeso());
		            							contenidoRepository.save(contenido);
		            							
		            						}
		            						);
		            				
		            				bloquesCurso.setBloqueComponentes(bloqueComponentes);
		            				bloquesCursoRepository.save(bloquesCurso);
		            			}
		            			);
		        
		            	return nivel;
		            		}
		            		);
		  
	 }

	/**
	 * Find all.
	 *
	 * @param pageable the pageable
	 * @return the page
	 */
	@Override
	public Page<NivelJerarquico> findAll(Pageable pageable) {
		
		return nivelJerarquicoRepository.findAll(pageable);
	}

	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	@Override
	public NivelJerarquicoResponse findOne(Long id) {
		
		NivelJerarquico nivelJerarquico = null;
		NivelJerarquicoResponse nivelResponse = new NivelJerarquicoResponse();
		Optional<NivelJerarquico> optionalNivelJerarquico = nivelJerarquicoRepository.findById(id);
		
		nivelJerarquico = optionalNivelJerarquico.get();
		nivelResponse.setNombre(nivelJerarquico.getNombre());
		nivelResponse.setInformacionAdicional(nivelJerarquico.getInformacionAdicional());
		nivelResponse.setNivelId(nivelJerarquico.getId());
		nivelResponse.setTipo(nivelJerarquico.getTipo());
		nivelResponse.setBloquesCurso(nivelJerarquico.getBloquesCurso().stream().distinct().collect(Collectors.toList()));
		log.debug("Response nivel {}", nivelResponse);
		return nivelResponse;
		
	}

	/**
	 * Delete.
	 *
	 * @param id the id
	 */
	@Override
	public void delete(Long id) {
		
		nivelJerarquicoRepository.deleteById(id);
	}

}
