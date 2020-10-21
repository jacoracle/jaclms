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

				agrupadorRepository.save(agrupador.get());

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
					nivelJerarquico.setId(dto.getId());
					nivelJerarquico.setNombre(dto.getNombre());
					nivelJerarquico.setImagenUrl(dto.getImagenUrl());

					if (!dto.getAgrupadores().isEmpty()) {
						nivelJerarquico.setAgrupadores(dto.getAgrupadores());

					}

					return nivelJerarquico;
				});
	}

}
