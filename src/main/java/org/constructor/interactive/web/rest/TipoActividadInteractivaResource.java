/**
 * 
 */
package org.constructor.interactive.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.interactive.domain.TipoActividadInteractiva;

import org.constructor.service.TipoActividadInteractivaService;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * @author Edukai
 *
 */
@RestController
@RequestMapping(RestConstants.PATH_API)
public class TipoActividadInteractivaResource {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TipoActividadInteractivaResource.class);

	/**
	 * ENTITY_NAME
	 */
	private static final String ENTITY_NAME = "tipoActividadInteractiva";

	/**
	 * applicationName
	 */
	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	/**
	 * tipoActividadInteractivaService
	 */
	@Autowired
	private TipoActividadInteractivaService tipoActividadInteractivaService;

	/**
	 * TipoActividadInteractivaResource
	 * 
	 * @param tipoActividadInteractivaService
	 */
	public TipoActividadInteractivaResource(TipoActividadInteractivaService tipoActividadInteractivaService) {
		this.tipoActividadInteractivaService = tipoActividadInteractivaService;
	}

	/**
	 * Post tipoActividadInteractiva
	 * 
	 * @param tipoActividadInteractiva
	 * @return
	 * @throws URISyntaxException
	 */
	@PostMapping(path = RestConstants.TIPO_ACTIVIDAD)
	public ResponseEntity<TipoActividadInteractiva> createTipoActividadInteractiva(
			@RequestBody TipoActividadInteractiva tipoActividadInteractiva) throws URISyntaxException {
		log.debug("REST request to save TipoActividadInteractiva : {}", tipoActividadInteractiva);
		if (tipoActividadInteractiva.getId() != null) {
			throw new BadRequestAlertException("A new temas cannot already have an ID", ENTITY_NAME, "idexists");
		}
		TipoActividadInteractiva result = tipoActividadInteractivaService.save(tipoActividadInteractiva);
		return ResponseEntity
				.created(new URI("/api/tipoActividadInteractiva/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * Put TipoActividadInteractiva
	 * 
	 * @param tipoActividadInteractiva
	 * @return
	 * @throws URISyntaxException
	 */
	@PutMapping(path = RestConstants.TIPO_ACTIVIDAD)
	public ResponseEntity<TipoActividadInteractiva> updateTipoActividadInteractiva(
			@RequestBody TipoActividadInteractiva tipoActividadInteractiva) throws URISyntaxException {
		log.debug("REST request to update TipoActividadInteractiva : {}", tipoActividadInteractiva);
		if (tipoActividadInteractiva.getId() == null) {
			throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
		}
		TipoActividadInteractiva result = tipoActividadInteractivaService.save(tipoActividadInteractiva);
		return ResponseEntity.ok().headers(
				HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * Get TipoActividadInteractiva
	 * 
	 * @param pageable
	 * @return
	 */
	@GetMapping(path = RestConstants.TIPO_ACTIVIDAD)
	public ResponseEntity<List<TipoActividadInteractiva>> getAllTipoActividadInteractiva(Pageable pageable) {
		log.debug("REST request to get a page of TipoActividadInteractiva");
		Page<TipoActividadInteractiva> page = tipoActividadInteractivaService.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * Get by id TipoActividadInteractiva
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(path = RestConstants.TIPO_ACTIVIDAD_ID)
	public ResponseEntity<TipoActividadInteractiva> getTipoActividadInteractiva(@PathVariable Long id) {
		log.debug("REST request to get TipoActividadInteractiva : {}", id);
		Optional<TipoActividadInteractiva> temas = tipoActividadInteractivaService.findOne(id);
		return ResponseUtil.wrapOrNotFound(temas);
	}

	/**
	 * Delete TipoActividadInteractiva
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping(path = RestConstants.TIPO_ACTIVIDAD_ID)
	public ResponseEntity<Void> deleteTipoActividadInteractiva(@PathVariable Long id) {
		log.debug("REST request to delete TipoActividadInteractiva : {}", id);
		tipoActividadInteractivaService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
