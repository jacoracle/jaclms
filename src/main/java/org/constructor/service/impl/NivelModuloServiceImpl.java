package org.constructor.service.impl;

import java.util.Optional;
import java.util.stream.Collectors;

import org.constructor.domain.BloqueComponentes;
import org.constructor.domain.BloquesCurso;
import org.constructor.domain.Componente;
import org.constructor.domain.Contenido;
import org.constructor.domain.Curso;
import org.constructor.domain.NivelModulo;
import org.constructor.domain.NivelesCurso;
import org.constructor.interactive.domain.ActividadInteractiva;
import org.constructor.module.domain.Modulo;
import org.constructor.module.domain.NivelesModulo;
import org.constructor.repository.ActividadInteractivaRepository;
import org.constructor.repository.BloqueComponentesRepository;
import org.constructor.repository.BloquesCursoRepository;
import org.constructor.repository.ComponenteRepository;
import org.constructor.repository.ContenidoRepository;
import org.constructor.repository.CursoRepository;
import org.constructor.repository.ModuloRepository;
import org.constructor.repository.NivelModuloRepository;
import org.constructor.repository.NivelesCursoRepository;
import org.constructor.repository.NivelesModuloRepository;
import org.constructor.response.NivelJerarquicoModuloResponse;
import org.constructor.response.NivelJerarquicoResponse;
import org.constructor.service.NivelModuloService;
import org.constructor.service.dto.ActividadInteractivaDTO;
import org.constructor.service.dto.BloquesCursoDTO;
import org.constructor.service.dto.ComponenteDTO;
import org.constructor.service.dto.NivelModuloDTO;
import org.constructor.service.dto.NivelJerarquicoModuloDTO;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

// TODO: Auto-generated Javadoc
/**
 * Service Implementation for managing {@link NivelModulo}.
 */
@Service
@Transactional
public class NivelModuloServiceImpl  implements NivelModuloService {
	
	/** The log. */
	private final Logger log = LoggerFactory.getLogger(NivelModuloServiceImpl.class);
	
	 /** The nivel jerarquico repository. */
 	private final NivelModuloRepository nivelModuloRepository;
	 
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
 	
 	 /** The modulo repository. */
 	@Autowired
	 private ModuloRepository moduloRepository;
 	
 	 /** The niveles modulo repository. */
 	@Autowired
	 private NivelesModuloRepository nivelesModuloRepository;
 	
 	/** The bloques curso repository. */
	 @Autowired
 	private BloquesCursoRepository bloquesCursoRepository;
 	
	 @Autowired
	 private ContenidoRepository contenidoRepository;
	 
	@Autowired
	private ActividadInteractivaRepository actividadInteractivaRepository;
	 
	 
	    /**
    	 * Instantiates a new nivel jerarquico service impl.
    	 *
    	 * @param nivelModuloRepository the nivel jerarquico repository
    	 */
    	public NivelModuloServiceImpl(NivelModuloRepository nivelModuloRepository) {
	        this.nivelModuloRepository = nivelModuloRepository;
	    }

	/**
	 * Save.
	 *
	 * @param nivelModuloDTO the nivel jerarquico DTO
	 * @return the nivel jerarquico
	 * @throws Exception the exception
	 */
	@Override
	@Transactional
	public NivelModulo saveCurso(NivelModuloDTO nivelModuloDTO) throws Exception {
		
		//Guardando NivelModulo
		NivelModulo nivelModulo = new NivelModulo();
		nivelModulo.setNombre(nivelModuloDTO.getNombre());
		nivelModulo.setTipo(nivelModuloDTO.getTipo());
		nivelModulo.setInformacionAdicional(nivelModuloDTO.getInformacionAdicional());
		nivelModuloRepository.save(nivelModulo);
		
		log.debug("Se guardó correctamente el nivelJerarquico: {}", nivelModulo);
		
		for (BloquesCursoDTO bloquesCursoDTO : nivelModuloDTO.getBloquesCurso()) {
			//Guardando BloquesCurso y BloqueComponentes
			BloquesCurso bloquesCurso = new BloquesCurso();
			BloqueComponentes bloqueComponentes = new BloqueComponentes();
			bloquesCurso.setIndicadorOriginal(bloquesCursoDTO.getIndicadorOriginal());
			bloquesCurso.setMostrar(bloquesCursoDTO.getMostrar());
			bloquesCurso.setNivelModulo(nivelModulo);
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
				if (contenido !=null ) {
				contenido.setComponente(componente);
				contenido.setContenido(componenteDTO.getContenido().getContenido());
				contenido.setNombre(componenteDTO.getContenido().getNombre());
				contenido.setExtension(componenteDTO.getContenido().getExtension());
				contenido.setPeso(componenteDTO.getContenido().getPeso());
				contenidoRepository.save(contenido);
				}
			}
			bloquesCurso.setBloqueComponentes(bloqueComponentes);
			bloquesCursoRepository.save(bloquesCurso);
			
			
			
		}
				
		//Guardando NivelesCurso
		Optional<Curso> curso = cursoRepository.findById(nivelModuloDTO.getCursoId());
		if (curso.isPresent()) {
			log.debug("Curso: {}", curso.get());
			NivelesCurso nivelesCurso = new NivelesCurso();
			nivelesCurso.setCurso(curso.get());
			nivelesCurso.setNivelJerarquico(nivelModulo);
			nivelesCurso.setOrdenNivel(nivelModuloDTO.getOrden());
			nivelesCursoRepository.save(nivelesCurso);
			log.debug("Se guardó correctamente nivelesCurso: {}", nivelesCurso);
		}else {
			throw new Exception("cursoId not found");
		}
		return nivelModulo;
	}
	
	
	 /**
 	 * Update nivel jerarquico.
 	 *
 	 * @param nivelModuloDTO the nivel jerarquico DTO
 	 * @return the optional
 	 * @throws Exception the exception
 	 */
 	public Optional<NivelModulo> updateNivelJerarquicoCurso(NivelModuloDTO nivelModuloDTO) throws Exception{
 				 
		return Optional.of(nivelModuloRepository
		            .findById(nivelModuloDTO.getNivelId()))
		            .filter(Optional::isPresent)
		            .map(Optional::get)
		            .map( nivel -> {
		            	nivel.getBloquesCurso().stream().collect(Collectors.toSet()).forEach(
		            			bloqueCurso -> {
		            				log.debug("Eliminando bloques: {}", bloqueCurso.getId());
		            				bloquesCursoRepository.deleteById(bloqueCurso.getId());
		            			}
		            			);
		            	nivel.setNombre(nivelModuloDTO.getNombre());
		            	nivel.setInformacionAdicional(nivelModuloDTO.getInformacionAdicional());
		            	nivel.setTipo(nivelModuloDTO.getTipo());
		            	nivelModuloDTO.getBloquesCurso().stream().forEach(
		            			bloqueCursoDTO -> {
		            				BloquesCurso bloquesCurso = new BloquesCurso();
		            				BloqueComponentes bloqueComponentes = new BloqueComponentes();
		            				bloquesCurso.setIndicadorOriginal(bloqueCursoDTO.getIndicadorOriginal());
		            				bloquesCurso.setMostrar(bloqueCursoDTO.getMostrar());
		            				bloquesCurso.setOrden(bloqueCursoDTO.getOrden());
		            				bloquesCurso.setNivelModulo(nivel);
		            				
		            				bloqueComponentes.setOrden(bloqueCursoDTO.getBloqueComponentes().getOrden());
		            				bloqueComponentes.setTipoBloqueComponentes(bloqueCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
		            				bloqueComponentesRepository.save(bloqueComponentes);
		            				
		            				bloqueCursoDTO.getBloqueComponentes().getComponentes().stream().forEach(
		            						componenteDTO -> {
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
	public Page<NivelModulo> findAll(Pageable pageable) {
		
		return nivelModuloRepository.findAll(pageable);
	}

	/**
	 * Find one.
	 *
	 * @param id the id
	 * @return the optional
	 */
	@Override
	public NivelJerarquicoResponse findOneCurso(Long id) {
		
		NivelModulo nivelModulo = null;
		NivelJerarquicoResponse nivelResponse = new NivelJerarquicoResponse();
		Optional<NivelModulo> optionalNivelJerarquico = nivelModuloRepository.findById(id);
		
		nivelModulo = optionalNivelJerarquico.get();
		nivelResponse.setNombre(nivelModulo.getNombre());
		nivelResponse.setInformacionAdicional(nivelModulo.getInformacionAdicional());
		nivelResponse.setNivelId(nivelModulo.getId());
		nivelResponse.setTipo(nivelModulo.getTipo());
		nivelResponse.setBloquesCurso(nivelModulo.getBloquesCurso().stream().distinct().collect(Collectors.toList()));
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
		
		nivelModuloRepository.deleteById(id);
	}

	/**
	 * saveModulo
	 */
	@Override
	@Transactional
	public NivelModulo saveModulo(NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception {
		//Guardando NivelModulo
		NivelModulo nivelJerarquicoMo = new NivelModulo();
		nivelJerarquicoMo.setNombre(nivelJerarquicoModulo.getNombre());
		nivelJerarquicoMo.setTipo(nivelJerarquicoModulo.getTipo());
		nivelJerarquicoMo.setInformacionAdicional(nivelJerarquicoModulo.getInformacionAdicional());
		nivelModuloRepository.save(nivelJerarquicoMo);
		
		log.debug("Se guardó correctamente el nivelJerarquico: {}", nivelJerarquicoMo);
		
		for (BloquesCursoDTO bloquesCursoDTO : nivelJerarquicoModulo.getBloquesCurso()) {
			//Guardando BloquesCurso y BloqueComponentes
			BloquesCurso bloquesCurso = new BloquesCurso();
			BloqueComponentes bloqueComponentes = new BloqueComponentes();
			bloquesCurso.setIndicadorOriginal(bloquesCursoDTO.getIndicadorOriginal());
			bloquesCurso.setMostrar(bloquesCursoDTO.getMostrar());
			bloquesCurso.setNivelModulo(nivelJerarquicoMo);
			bloquesCurso.setOrden(bloquesCursoDTO.getOrden());
			
			bloqueComponentes.setOrden(bloquesCursoDTO.getBloqueComponentes().getOrden());
			bloqueComponentes.setTipoBloqueComponentes(bloquesCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
			bloqueComponentesRepository.save(bloqueComponentes);
			
			for (ComponenteDTO componenteDTO : bloquesCursoDTO.getBloqueComponentes().getComponentes()) {
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
				actv.setContenido( actividadInteractiva.getContenido());
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
			bloquesCurso.setBloqueComponentes(bloqueComponentes);
			bloquesCursoRepository.save(bloquesCurso);
			
			
			
		}
				
		//Guardando NivelesModulo
		Optional<Modulo> modulo = moduloRepository.findById(nivelJerarquicoModulo.getModuloId());
		if (modulo.isPresent()) {
			log.debug("modulo: {}", modulo.get());
			NivelesModulo nivelesModulo = new NivelesModulo();
			nivelesModulo.setModulo(modulo.get());
			nivelesModulo.setNivelJerarquico(nivelJerarquicoMo);
			nivelesModulo.setOrdenNivel(nivelJerarquicoModulo.getOrden());
			nivelesModuloRepository.save(nivelesModulo);
			log.debug("Se guardó correctamente nivelesModulo: {}", nivelesModulo);
		}else {
			throw new Exception("moduloId not found");
		}
		return nivelJerarquicoMo;
	
	}

	/**
	 * findOneModulo
	 */
	@Override
	public NivelJerarquicoModuloResponse findOneModulo(Long id) {
		NivelModulo nivelModulo = null;
		NivelJerarquicoModuloResponse nivelResponse = new NivelJerarquicoModuloResponse();
		Optional<NivelModulo> optionalNivelJerarquico = nivelModuloRepository.findById(id);
		
		nivelModulo = optionalNivelJerarquico.get();
		nivelResponse.setNombre(nivelModulo.getNombre());
		nivelResponse.setInformacionAdicional(nivelModulo.getInformacionAdicional());
		nivelResponse.setNivelId(nivelModulo.getId());
		nivelResponse.setTipo(nivelModulo.getTipo());
		nivelResponse.setBloquesCurso(nivelModulo.getBloquesCurso().stream().distinct().collect(Collectors.toList()));
		log.debug("Response nivel {}", nivelResponse);
		return nivelResponse;
	}

	/**
	 * updateNivelJerarquicoModule
	 */
	@Override
	public Optional<NivelModulo> updateNivelJerarquicoModule(NivelJerarquicoModuloDTO nivelJerarquicoModulo)
			throws Exception {
		return Optional.of(nivelModuloRepository
	            .findById(nivelJerarquicoModulo.getNivelId()))
	            .filter(Optional::isPresent)
	            .map(Optional::get)
	            .map( nivel -> {
	            	nivel.getBloquesCurso().stream().collect(Collectors.toSet()).forEach(
	            			bloqueCurso -> {
	            				log.debug("Eliminando bloques: {}", bloqueCurso.getId());
	            				bloquesCursoRepository.deleteById(bloqueCurso.getId());
	            			}
	            			);
	            	nivel.setNombre(nivelJerarquicoModulo.getNombre());
	            	nivel.setInformacionAdicional(nivelJerarquicoModulo.getInformacionAdicional());
	            	nivel.setTipo(nivelJerarquicoModulo.getTipo());
	            	nivelJerarquicoModulo.getBloquesCurso().stream().forEach(
	            			bloqueCursoDTO -> {
	            				BloquesCurso bloquesCurso = new BloquesCurso();
	            				BloqueComponentes bloqueComponentes = new BloqueComponentes();
	            				bloquesCurso.setIndicadorOriginal(bloqueCursoDTO.getIndicadorOriginal());
	            				bloquesCurso.setMostrar(bloqueCursoDTO.getMostrar());
	            				bloquesCurso.setOrden(bloqueCursoDTO.getOrden());
	            				bloquesCurso.setNivelModulo(nivel);
	            				
	            				bloqueComponentes.setOrden(bloqueCursoDTO.getBloqueComponentes().getOrden());
	            				bloqueComponentes.setTipoBloqueComponentes(bloqueCursoDTO.getBloqueComponentes().getTipoBloqueComponentes());
	            				bloqueComponentesRepository.save(bloqueComponentes);
	            				
	            				bloqueCursoDTO.getBloqueComponentes().getComponentes().stream().forEach(
	            						componenteDTO -> {
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
							            actv.setContenido( actividadInteractiva.getContenido());
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
	            						);
	            				
	            				bloquesCurso.setBloqueComponentes(bloqueComponentes);
	            				bloquesCursoRepository.save(bloquesCurso);
	            			}
	            			);
	        
	            	return nivel;
	            		}
	            		);
	}

}
