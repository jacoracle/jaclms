/**
 * 
 */
package org.constructor.service.impl.rutas;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.agrupador.Agrupador;
import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.domain.rutas.NivelRuta;
import org.constructor.domain.rutas.RutasAprendizaje;
import org.constructor.repository.agrupador.AgrupadorRepository;
import org.constructor.repository.rutas.EstructuraJerarquicaRepository;
import org.constructor.repository.rutas.NivelJerarquicoRepository;
import org.constructor.repository.rutas.NivelRutaRepository;
import org.constructor.repository.rutas.RutasAprendizajeRepository;
import org.constructor.service.dto.rutas.NivelJerarquicoDTO;
import org.constructor.service.rutas.NivelJerarquicoService;
import org.slf4j.Logger;
import org.constructor.domain.EstructuraJerarquica;

import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Edukai
 *
 */
@Service
@Transactional
public class NivelJerarquicoServiceImpl implements NivelJerarquicoService {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(NivelJerarquicoServiceImpl.class);

	/**
	 * NivelJerarquicoRepository
	 */
	private final NivelJerarquicoRepository nivelJerarquicoRepository;

	/**
	 * Repository
	 */
	@Autowired
	private AgrupadorRepository agrupadorRepository;

	/**
	 * estructuraJerarquicaRepository
	 */
	@Autowired
	private EstructuraJerarquicaRepository estructuraJerarquicaRepository;

	/**
	 * nivelRutaRepository
	 */
	@Autowired
	private NivelRutaRepository nivelRutaRepository;
	
	/**
	 * rutasAprendizajeRepository
	 */
	@Autowired
	private RutasAprendizajeRepository rutasAprendizajeRepository;

	/**
	 * NivelJerarquicoServiceImpl.
	 *
	 * @param nivelJerarquicoRepository the nivel jerarquico repository
	 */
	public NivelJerarquicoServiceImpl(NivelJerarquicoRepository nivelJerarquicoRepository) {
		this.nivelJerarquicoRepository = nivelJerarquicoRepository;
	}

	/**
	 * Save NivelJerarquico
	 */
	@Override
	public NivelJerarquico save(NivelJerarquico nivelJerarquico) {

		return nivelJerarquicoRepository.save(nivelJerarquico);
	}

	/**
	 * finAll NivelJerarquico
	 */
	@Override
	public Page<NivelJerarquico> findAll(Pageable pageable) {
		return nivelJerarquicoRepository.findAll(pageable);

	}

	/**
	 * finOne NivelJerarquico
	 */
	@Override
	public Optional<NivelJerarquico> findOne(Long id) {
		return nivelJerarquicoRepository.findById(id);
	}

	/**
	 * Delete NivelJerarquico
	 */
	@Override
	public void delete(Long id) {
		nivelJerarquicoRepository.deleteById(id);

	}

	/**
	 * Save
	 */
	@Override
	public NivelJerarquico save(NivelJerarquicoDTO nivelDto) {
		log.debug("Request to save Nivel-Jerarquico : {}", nivelDto);

		Set<Agrupador> listAgrupador = new HashSet<>();
		Set<NivelJerarquico> listNivel = new HashSet<>();
		Set<RutasAprendizaje> listRuta = new HashSet<>();
		Set<EstructuraJerarquica> listEstructuta = new HashSet<>();
		NivelJerarquico jerarquico = new NivelJerarquico();
		jerarquico.setNombre(nivelDto.getNombre());
		jerarquico.setImagenUrl(nivelDto.getImagenUrl());

		if (nivelDto.getAgrupadores() != null) {
			nivelDto.getAgrupadores().forEach(agrupadorDTO -> {
				Optional<Agrupador> agrupador = agrupadorRepository.findById(agrupadorDTO.getId());

				listAgrupador.add(agrupador.get());

			});
			jerarquico.setAgrupadores(listAgrupador);
		}

		nivelJerarquicoRepository.save(jerarquico);
		
		if (nivelDto.getEstructuraJerarquica() != null) {
			log.debug("Request if estructura  : {}", nivelDto.getEstructuraJerarquica());
			EstructuraJerarquica estructuraJerarquica = new EstructuraJerarquica();
			nivelDto.getEstructuraJerarquica().forEach(estructuraDTO -> {
				Optional<NivelJerarquico> nivelJerarquico = nivelJerarquicoRepository.findById(estructuraDTO.getId());
				log.debug("Request  idEstructuraDTO  : {}", estructuraDTO.getId());
				log.debug("Request lista ListNivel  : {}", nivelJerarquico);
				log.debug("Request lista Antes  : {}", listNivel);
				log.debug("Request Estructura  : {}", estructuraJerarquica);

				listNivel.add(nivelJerarquico.get());
				log.debug("Request lista Despues  : {}", listNivel);
				
				estructuraJerarquica.setOrdenNivel(estructuraDTO.getOrdenNivel());

			});

			listNivel.forEach(listaJ -> {

				estructuraJerarquica.setNivel(listaJ.getId());
				estructuraJerarquica.setSubNivelJerarquico(jerarquico);
				
			});
			jerarquico.setEstructuraJerarquica(listEstructuta);
			estructuraJerarquicaRepository.save(estructuraJerarquica);
			log.debug("Request lista Save  : {}", estructuraJerarquica);

		}

		if (nivelDto.getNivelRuta() != null) {
			log.debug("Request if nivelRuta  : {}", nivelDto.getNivelRuta());
			NivelRuta nivelRuta = new NivelRuta();
			nivelDto.getNivelRuta().forEach(rutasDTO -> {
				Optional<RutasAprendizaje> ruta = rutasAprendizajeRepository.findById(rutasDTO.getId());
				log.debug("Request lista ruta  : {}", ruta);

				listRuta.add(ruta.get());
				log.debug("Request lista ruta Despues  : {}", ruta);

				nivelRuta.setOrden(rutasDTO.getOrden());
				nivelRuta.setNivelJerarquico(jerarquico);
				nivelRuta.setRutasAprendizaje(ruta.get());
				
				
			});

		
			nivelRutaRepository.save(nivelRuta);
			log.debug("Request lista ruta save  : {}", nivelRuta);

			
		}

		log.debug("Request jerarquico  : {}", jerarquico);
		return jerarquico;
		

	}

}
