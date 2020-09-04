/**
 * 
 */
package org.constructor.web.rest.interactive;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.interactive.ActividadInteractiva;
import org.constructor.service.dto.interactive.ActividadInteractivaDTO;
import org.constructor.service.interactive.ActividadInteractivaService;
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
public class ActividadInteractivaResource {

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ActividadInteractivaResource.class);

	/**
	 * ENTITY_NAME
	 */
	private static final String ENTITY_NAME = "actividadInteractiva";

	/**
	 * applicationName
	 */
	@Value("${jhipster.clientApp.name}")
	private String applicationName;

	/**
	 * ActividadInteractivaService
	 */
	@Autowired
	private ActividadInteractivaService actividadInteractivaService;

	/**
	 * ActividadInteractivaResource
	 * 
	 * @param actividadInteractivaService
	 */
	public ActividadInteractivaResource(ActividadInteractivaService actividadInteractivaService) {
		this.actividadInteractivaService = actividadInteractivaService;
	}

	/**
	 * Post actividadInteractivaService
	 * 
	 * @param actividadInteractiva
	 * @return
	 * @throws URISyntaxException
	 */
	@PostMapping(path = RestConstants.ACTIVIDAD)
	public ResponseEntity<ActividadInteractiva> createActividadInteractiva(
			@RequestBody ActividadInteractiva actividadInteractiva) throws URISyntaxException {
		log.debug("REST request to save ActividadInteractiva : {}", actividadInteractiva);
		if (actividadInteractiva.getId() != null) {
			throw new BadRequestAlertException("A new temas cannot already have an ID", ENTITY_NAME, "idexists");
		}
		ActividadInteractiva result = actividadInteractivaService.save(actividadInteractiva);
		return ResponseEntity
				.created(new URI("/api/actividad/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * Put actividadInteractivaService
	 * 
	 * @param actividadInteractiva
	 * @return
	 * @throws Exception 
	 */
	@PutMapping(path = RestConstants.ACTIVIDAD)
	public  ResponseEntity<Optional<ActividadInteractiva>> updateActividadInteractiva(
			@RequestBody ActividadInteractivaDTO actividadDto) throws Exception {
        log.debug("REST request to update ActividadInteractiva : {}", actividadDto);

        if (actividadDto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (actividadDto.getContenido() == null) {
        	 throw new BadRequestAlertException("Invalid content", ENTITY_NAME, "null content");
        }
		
        Optional<ActividadInteractiva> result = actividadInteractivaService.updateActividad(actividadDto);
        Optional<ActividadInteractiva> actividad = actividadInteractivaService.findOne(result.get().getId());
        log.debug("Update Level  : {}", actividad);
        log.debug("Update result  : {}", result);

        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
            .body(actividad);
	}

	/**
	 * Get ActividadInteractiva
	 * 
	 * @param pageable
	 * @return
	 */
	@GetMapping(path = RestConstants.ACTIVIDAD)
	public ResponseEntity<List<ActividadInteractiva>> getAllActividadInteractiva(Pageable pageable) {
		log.debug("REST request to get a page of ActividadInteractiva");
		Page<ActividadInteractiva> page = actividadInteractivaService.findAll(pageable);
		HttpHeaders headers = PaginationUtil
				.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
		return ResponseEntity.ok().headers(headers).body(page.getContent());
	}

	/**
	 * Get by id ActividadInteractiva
	 * 
	 * @param id
	 * @return
	 */
	@GetMapping(path = RestConstants.ACTIVIDAD_ID)
	public ResponseEntity<ActividadInteractiva> getActividadInteractiva(@PathVariable Long id) {
		log.debug("REST request to get ActividadInteractiva : {}", id);
		Optional<ActividadInteractiva> temas = actividadInteractivaService.findOne(id);
		return ResponseUtil.wrapOrNotFound(temas);
	}

	/**
	 * Delete ActividadInteractiva
	 * 
	 * @param id
	 * @return
	 */
	@DeleteMapping(path = RestConstants.ACTIVIDAD_ID)
	public ResponseEntity<Void> deleteActividadInteractiva(@PathVariable Long id) {
		log.debug("REST request to delete ActividadInteractiva : {}", id);
		actividadInteractivaService.delete(id);
		return ResponseEntity.noContent()
				.headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString()))
				.build();
	}
}
