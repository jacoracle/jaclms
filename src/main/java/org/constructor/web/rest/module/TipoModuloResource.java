/**
 * 
 */
package org.constructor.web.rest.module;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.module.TipoModulo;
import org.constructor.service.module.TipoModuloService;
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
public class TipoModuloResource {

	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(TipoModuloResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "tipo_Modulo";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * tipoModuloService
     */
    @Autowired
	private TipoModuloService tipoModuloService;
    
    /**
     * TipoModuloResource
     * @param tipoModuloService
     */
	 public TipoModuloResource(TipoModuloService tipoModuloService) {
	        this.tipoModuloService = tipoModuloService;
	    }
	 
	 /**
	     * {@code POST  /tipo-modulo} : Create a new tipoModulo.
	     *
	     * @param tipoModulo the tipoModulo to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoModulo, or with status {@code 400 (Bad Request)} if the tipoModulo has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping(path = RestConstants.PATH_TIPO_MODULO)
	    public ResponseEntity<TipoModulo> createTipoModulo(@RequestBody TipoModulo tipoModulo) throws URISyntaxException {
	        log.debug("REST request to save TipoModulo : {}", tipoModulo);
	        if (tipoModulo.getId() != null) {
	            throw new BadRequestAlertException("A new tipoModulo cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        TipoModulo result = tipoModuloService.save(tipoModulo);
	        return ResponseEntity.created(new URI("/api/tipo-modulo/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code PUT  /tipo-modulo} : Updates an existing tipoModulo.
	     *
	     * @param tipoModulo the tipoModulo to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoModulo,
	     * or with status {@code 400 (Bad Request)} if the tipoModulo is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the tipoModulo couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping(path = RestConstants.PATH_TIPO_MODULO)
	    public ResponseEntity<TipoModulo> updateTipoModulo(@RequestBody TipoModulo tipoModulo) throws URISyntaxException {
	        log.debug("REST request to update TipoModulo : {}", tipoModulo);
	        if (tipoModulo.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        TipoModulo result = tipoModuloService.save(tipoModulo);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code GET  /tipo-modulo} : get all the tipoModulo.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoModulo in body.
	     */
	    @GetMapping(path = RestConstants.PATH_TIPO_MODULO)
	    public ResponseEntity<List<TipoModulo>> getAllTipoModulo(Pageable pageable) {
	        log.debug("REST request to get a page of TipoModulo");
	        Page<TipoModulo> page = tipoModuloService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /tipo-modulo/:id} : get the "id" tipoModulo.
	     *
	     * @param id the id of the tipoModulo to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoModulo, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping(path = RestConstants.PATH_TIPO_MODULO_ID)
	    public ResponseEntity<TipoModulo> getTipoModulo(@PathVariable Long id) {
	        log.debug("REST request to get TipoModulo : {}", id);
	        Optional<TipoModulo> tipoModulo = tipoModuloService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(tipoModulo);
	    }
	    
	    /**
	     * {@code DELETE  /tipo_modulo/:id} : delete the "id" tipoModulo.
	     *
	     * @param id the id of the tipoModulo to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping(path = RestConstants.PATH_TIPO_MODULO_ID)
	    public ResponseEntity<Void> deleteTipoModulo(@PathVariable Long id) {
	        log.debug("REST request to delete TipoModulo : {}", id);
	        tipoModuloService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }

}
