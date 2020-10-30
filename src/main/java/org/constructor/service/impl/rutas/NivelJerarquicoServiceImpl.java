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
import org.constructor.response.OrdenamientoResponse;
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

		}
		jerarquico.setAgrupadores(listAgrupador);

		nivelJerarquicoRepository.save(jerarquico);
		if (!nivelDto.getEstructuraJerarquica().isEmpty()) {
			EstructuraJerarquica estructuraJerarquica = new EstructuraJerarquica();
			nivelDto.getEstructuraJerarquica().forEach(estructuraDTO -> {
				Optional<NivelJerarquico> nivelJerarquico = nivelJerarquicoRepository.findById(estructuraDTO.getId());

				listNivel.add(nivelJerarquico.get());

				estructuraJerarquica.setOrdenNivel(estructuraDTO.getOrdenNivel());

			});

			listNivel.forEach(listaJ -> {

				estructuraJerarquica.setNivel(listaJ.getId());
				estructuraJerarquica.setSubNivelJerarquico(jerarquico);

			});
			estructuraJerarquicaRepository.save(estructuraJerarquica);

		}

		if (!nivelDto.getNivelRuta().isEmpty()) {
			NivelRuta nivelRuta = new NivelRuta();
			nivelDto.getNivelRuta().forEach(rutasDTO -> {
				Optional<RutasAprendizaje> ruta = rutasAprendizajeRepository.findById(rutasDTO.getId());
				listRuta.add(ruta.get());
				nivelRuta.setOrden(rutasDTO.getOrden());
				nivelRuta.setNivelJerarquico(jerarquico);
				nivelRuta.setRutasAprendizaje(ruta.get());

			});

			nivelRutaRepository.save(nivelRuta);

		}

		jerarquico.setEstructuraJerarquica(listEstructuta);
		return jerarquico;

	}

	/**
	 * updateNivelJerarquico
	 * 
	 */
	@Override
	public Optional<NivelJerarquico> updateNivelJerarquico(NivelJerarquicoDTO dto) throws Exception {
		return Optional.of(nivelJerarquicoRepository.findById(dto.getId())).filter(Optional::isPresent)
				.map(Optional::get).map(nivelJerarquico -> {
					nivelJerarquico.setNombre(dto.getNombre());
					nivelJerarquico.setImagenUrl(dto.getImagenUrl());

					if (!dto.getAgrupadores().isEmpty()) {
						Set<Agrupador> listAgrupadorNivel = new HashSet<>();

						dto.getAgrupadores().forEach(agrupadoresDTO -> {

							Optional<Agrupador> agrupadorNivel = agrupadorRepository.findById(agrupadoresDTO.getId());
							listAgrupadorNivel.add(agrupadorNivel.get());

							nivelJerarquico.getAgrupadores().addAll(listAgrupadorNivel);

						});
					}

					return nivelJerarquico;
				});
	}
	
	

	/**
	 * Update  To Order
	 */
	@Override
	public Optional<OrdenamientoResponse> updateOrder(NivelJerarquicoDTO dto) throws Exception {

		return Optional.of(nivelJerarquicoRepository.findById(dto.getId())).filter(Optional::isPresent)
				.map(Optional::get).map(nivelJerarquico -> {

					OrdenamientoResponse ordenamientoResponse = new OrdenamientoResponse();
					
					/**
					 * Update Agrupadores
					 */
					if (!dto.getAgrupadores().isEmpty()) {
						log.debug("entro a agrupadores para ordenar");
						Set<Agrupador> listAgrupador = new HashSet<>();
						dto.getAgrupadores().forEach(agrupadoresDTO -> {
							Optional<Agrupador> agrupador = agrupadorRepository.findById(agrupadoresDTO.getId());
							listAgrupador.add(agrupador.get());
							
							nivelJerarquico.getAgrupadores().addAll(listAgrupador);
							
						/**	dto.getEstructuraJerarquica().forEach(delete -> {
								Optional<NivelJerarquico> nivel1 =  nivelJerarquicoRepository.findById(delete.getId());
								
								nivel1.get().getAgrupadores().clear();
								
							});*/
							

						});

					}

					/**
					 * Update To Estructura Jeararquica
					 */
					if (!dto.getEstructuraJerarquica().isEmpty()) {
						log.debug("entro a estructura jerarquica");
						dto.getEstructuraJerarquica().forEach(estructuradDTO -> {
							Optional.of(estructuraJerarquicaRepository.findBySubNivel(nivelJerarquico))
									.filter(Optional::isPresent).map(Optional::get).map(estructura -> {
										estructura.setOrdenNivel(estructuradDTO.getOrdenNivel());
										estructura.setNivel(estructuradDTO.getId());
										estructura.setSubNivelJerarquico(nivelJerarquico);
										ordenamientoResponse.setOrden(estructuradDTO.getOrdenNivel());
										return estructura;  
									});

						});

					}

					/**
					 * Update to Niveles Rutas
					 */
					if (!dto.getNivelRuta().isEmpty()) {
						log.debug("entro a niveles ruta");
						dto.getNivelRuta().forEach(rutasNivelesDTO -> {
							Optional<RutasAprendizaje> rutasOptional = rutasAprendizajeRepository
									.findById(rutasNivelesDTO.getId());
							Optional.of(nivelRutaRepository.findByRutas(nivelJerarquico)).filter(Optional::isPresent)
									.map(Optional::get).map(nivelesRutas -> {
										nivelesRutas.setOrden(rutasNivelesDTO.getOrden());
										nivelesRutas.setRutasAprendizaje(rutasOptional.get());
										nivelesRutas.setNivelJerarquico(nivelJerarquico);

										ordenamientoResponse.setRuta(rutasOptional.get());
										ordenamientoResponse.setOrden(rutasNivelesDTO.getOrden());

										return nivelesRutas;
									});

						});

					}

					

					ordenamientoResponse.setNivelJerarquico(nivelJerarquico);
					return ordenamientoResponse;
				});
	}

}
