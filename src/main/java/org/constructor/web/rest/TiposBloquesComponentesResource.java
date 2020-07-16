/**
 * 
 */
package org.constructor.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.TiposBloquesComponentes;
import org.constructor.service.TiposBloquesComponentesService;
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
public class TiposBloquesComponentesResource {
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TiposBloquesComponentesResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "tipos_bloques_componentes";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * TiposBloquesComponentesService
     */
    @Autowired
	private TiposBloquesComponentesService tiposBloquesComponentesService;
    
    /**
     * TiposBloquesComponentesResource
     * 
     * @param tiposBloquesComponentesService
     */
	 public TiposBloquesComponentesResource(TiposBloquesComponentesService tiposBloquesComponentesService) {
	        this.tiposBloquesComponentesService = tiposBloquesComponentesService;
	    }
	 
	 /**
	     * {@code POST  /tipos-bloques-componentes} : Create a new tiposBloquesComponentes.
	     *
	     * @param tiposBloquesComponentes the tiposBloquesComponentes to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tiposBloquesComponentes, or with status {@code 400 (Bad Request)} if the tiposBloquesComponentes has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping(path = RestConstants.PATH_TIPOS_BLOQUES_COMPONENTES)
	    public ResponseEntity<TiposBloquesComponentes> createTiposBloquesComponentes(@RequestBody TiposBloquesComponentes tiposBloquesComponentes) throws URISyntaxException {
	        log.debug("REST request to save TiposBloquesComponentes : {}", tiposBloquesComponentes);
	       
             TiposBloquesComponentes result = tiposBloquesComponentesService.save(tiposBloquesComponentes);
	        return ResponseEntity.created(new URI("/api/tipos-bloques-componentes/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    
	    /**
	     * {@code PUT  /tipos-bloques-componentes} : Updates an existing tiposBloquesComponentes.
	     *
	     * @param tiposBloquesComponentes the tiposBloquesComponentes to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tiposBloquesComponentes,
	     * or with status {@code 400 (Bad Request)} if the tiposBloquesComponentes is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the tiposBloquesComponentes couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping(path = RestConstants.PATH_TIPOS_BLOQUES_COMPONENTES)
	    public ResponseEntity<TiposBloquesComponentes> updateTiposBloquesComponentes(@RequestBody TiposBloquesComponentes tiposBloquesComponentes) throws URISyntaxException {
	        log.debug("REST request to update TiposBloquesComponentes : {}", tiposBloquesComponentes);
	        if (tiposBloquesComponentes.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        TiposBloquesComponentes result = tiposBloquesComponentesService.save(tiposBloquesComponentes);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }

	    
	    /**
	     * {@code GET  /tipos-bloques-componentes} : get all the tiposBloquesComponentes.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoBsloquesComponentes in body.
	     */
	    @GetMapping(path = RestConstants.PATH_TIPOS_BLOQUES_COMPONENTES)
	    public ResponseEntity<List<TiposBloquesComponentes>> getAllTiposBloquesComponentes(Pageable pageable) {
	        log.debug("REST request to get a page of TiposBloquesComponentes");
	        Page<TiposBloquesComponentes> page = tiposBloquesComponentesService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    
	    /**
	     * {@code GET  /tipos-bloques-componentse/:id} : get the "id" tiposBloquesComponentes.
	     *
	     * @param id the id of the tiposBloquesComponentes to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tiposBloquesComponentes, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping(path = RestConstants.PATH_TIPOS_BLOQUES_COMPONENTES_ID)
	    public ResponseEntity<TiposBloquesComponentes> getTipoBloqueComponentes(@PathVariable Long id) {
	        log.debug("REST request to get TiposBloquesComponentes : {}", id);
	        Optional<TiposBloquesComponentes> tiposBloquesComponentes = tiposBloquesComponentesService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(tiposBloquesComponentes);
	    }
	    
	    /**
	     * {@code DELETE  /tipos-bloques-componentes/:id} : delete the "id" tiposBloquesComponentes.
	     *
	     * @param id the id of the tiposBloquesComponente to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping(path = RestConstants.PATH_TIPOS_BLOQUES_COMPONENTES_ID)
	    public ResponseEntity<Void> deleteTiposBloquesComponentes(@PathVariable Long id) {
	        log.debug("REST request to delete TiposBloquesComponentes : {}", id);
	        tiposBloquesComponentesService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
	    
}
