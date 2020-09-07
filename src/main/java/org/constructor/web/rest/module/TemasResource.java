/**
 * 
 */
package org.constructor.web.rest.module;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.module.Temas;
import org.constructor.service.module.TemasService;
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
public class TemasResource {

	
	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TemasResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "temas";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * temasService
     */
    @Autowired
	private TemasService temasService;
    
    /**
     * TemasResource
     * @param temasService
     */
	 public TemasResource(TemasService temasService) {
	        this.temasService = temasService;
	    }
	 
	 /**
	     * {@code POST  /temas} : Create a new temas.
	     *
	     * @param temas the temas to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new temas, or with status {@code 400 (Bad Request)} if the temas has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping(path = RestConstants.PATH_TEMAS)
	    public ResponseEntity<Temas> createTemas(@RequestBody Temas temas) throws URISyntaxException {
	        log.debug("REST request to save Temas : {}", temas);
	        if (temas.getId() != null) {
	            throw new BadRequestAlertException("A new temas cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        Temas result = temasService.save(temas);
	        return ResponseEntity.created(new URI("/api/temas/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code PUT  /temas} : Updates an existing temas.
	     *
	     * @param temas the temas to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated temas,
	     * or with status {@code 400 (Bad Request)} if the temas is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the temas couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping(path = RestConstants.PATH_TEMAS)
	    public ResponseEntity<Temas> updateTemas(@RequestBody Temas temas) throws URISyntaxException {
	        log.debug("REST request to update Temas : {}", temas);
	        if (temas.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        Temas result = temasService.save(temas);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code GET  /temas} : get all the temas.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of temas in body.
	     */
	    @GetMapping(path = RestConstants.PATH_TEMAS)
	    public ResponseEntity<List<Temas>> getAllTemas(Pageable pageable) {
	        log.debug("REST request to get a page of Temas");
	        Page<Temas> page = temasService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /temas/:id} : get the "id" temas.
	     *
	     * @param id the id of the temas to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the temas, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping(path = RestConstants.PATH_TEMAS_ID)
	    public ResponseEntity<Temas> getTemas(@PathVariable Long id) {
	        log.debug("REST request to get Temas : {}", id);
	        Optional<Temas> temas = temasService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(temas);
	    }
	    
	    /**
	     * {@code DELETE  /temas/:id} : delete the "id" temas.
	     *
	     * @param id the id of the temas to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping(path = RestConstants.PATH_TEMAS_ID)
	    public ResponseEntity<Void> deleteTemas(@PathVariable Long id) {
	        log.debug("REST request to delete Temas : {}", id);
	        temasService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}
