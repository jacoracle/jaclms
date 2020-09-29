/**
 * 
 */
package org.constructor.web.rest.agrupador;

import java.io.IOException;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.constructor.domain.agrupador.Agrupador;
import org.constructor.service.agrupador.AgrupadorService;
import org.constructor.service.dto.agrupador.AgrupadorDTO;
import org.constructor.service.dto.agrupador.AgrupadorFiltroDTO;
import org.constructor.service.dto.agrupador.AgrupadorUpdateDTO;
import org.constructor.service.dto.agrupador.DTOAgrupador;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import org.springframework.security.core.Authentication;
import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * @author Edukai
 *
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping(RestConstants.PATH_API)
public class AgrupadorResource {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(AgrupadorResource.class);

	/**
	 * ENTITY_NAME
	 */
	private static final String ENTITY_NAME = "agrupador";

	/**
	 * applicationName
	 */
	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	/**
	 * agrupadorService
	 */
	@Autowired
	private AgrupadorService agrupadorService;

	/**
	 * AgrupadorResource
	 * 
	 * @param agrupadorService
	 */
	public AgrupadorResource(AgrupadorService agrupadorService) {
		this.agrupadorService = agrupadorService;
	}

	/**
	 * Post agrupador
	 * 
	 * @param agrupador
	 * @return
	 * @throws URISyntaxException
	 */
	@PostMapping(path = RestConstants.PATH_AGRUPADOR)
	public ResponseEntity<AgrupadorDTO> createAgrupador(Authentication authentication, @RequestBody DTOAgrupador agrupadorDTO)
			throws IOException {
		log.debug("REST request to save Agrupador : {}", agrupadorDTO);
		if (agrupadorDTO == null) {
			throw new BadRequestAlertException("A new agrupador cannot is empty", ENTITY_NAME, "");
		}
		log.debug("REST request to mo : {}", agrupadorDTO);
		AgrupadorDTO result = agrupadorService.save(authentication, agrupadorDTO);
		log.debug("result : {}", result);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}

	/**
	 * Update agrupador
	 * 
	 * @param agrupador
	 * @return
	 * @throws Exception
	 */
	@PutMapping(path = RestConstants.PATH_AGRUPADOR)
	public ResponseEntity<Optional<Agrupador>> updateAgrupador(@RequestBody AgrupadorUpdateDTO agrupador)
			throws Exception {
		log.debug("REST request to update Agrupador : {}", agrupador);
		if (agrupador.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}

		Optional<Agrupador> result = agrupadorService.updateAgrupador(agrupador);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
				.body(result);
	}

	/**
	 * Get agrupador 2'
	 * 
	 * @param pageable
	 * @return
	 */
	@GetMapping(path = RestConstants.PATH_AGRUPADOR)
	public ResponseEntity<List<Agrupador>> getAllAgrupador20(Pageable pageable, Authentication authentication) {
		log.debug("REST request to get a page of Agrupador");
		Page<Agrupador> page = agrupadorService.findFirst20AgrupadorByOrderByIdDesc(pageable, authentication);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * Get by id
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(path = RestConstants.PATH_AGRUPADOR_ID)
	public ResponseEntity<Agrupador> getAgrupador(@PathVariable Long id) {
		log.debug("REST request to get Agrupador : {}", id);
		Optional<Agrupador> agrupador = agrupadorService.findOne(id);

		return ResponseUtil.wrapOrNotFound(agrupador);
	}

	/**
	 * Delete by id
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping(path = RestConstants.PATH_AGRUPADOR_ID)
	public ResponseEntity<Void> deleteAgrupador(@PathVariable Long id) {
		log.debug("REST request to delete Agrupador : {}", id);
		agrupadorService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}

	/**
	 * 
	 * @param authentication
	 * @return
	 */
	@GetMapping(path = RestConstants.PATH_AGRUPADOR_ALL)
	public ResponseEntity<List<Agrupador>> getAlAgrupadores(Authentication authentication) {
		log.debug("REST request to get a page of Agrupador by User");
		List<Agrupador> page = agrupadorService.findAllAgrupadorUserId(authentication);
		return ResponseEntity.ok().body(page);
	}

	/**
	 * getAgrupadorFiltro
	 * 
	 * @param agrup
	 * @return
	 * @throws Exception
	 */
	@GetMapping(path = RestConstants.PATH_BUSQUEDA_AGRUPADOR)
	public Set<Agrupador> getAgrupadorByBusqueda(Authentication authentication,@RequestParam String titulo, @RequestParam String descripcion,
			@RequestParam String etiqueta) throws Exception {
		AgrupadorFiltroDTO agrup = new AgrupadorFiltroDTO();
		agrup.setTitulo(titulo);
		agrup.setDescripcion(descripcion);
		agrup.setEtiqueta(etiqueta);

		return agrupadorService.findAgrupadorByTituloByDescripcionByEtiqueta(agrup, authentication);

	}

}
