/**
 * 
 */
package org.constructor.module.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.module.domain.AgrupadorModulo;
import org.constructor.service.AgrupadorModuloService;
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
public class AgrupadorModuloResource {


	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(AgrupadorModuloResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "agrupador_modulo";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * agrupadorService
     */
    @Autowired
	private AgrupadorModuloService agrupadorModuloService ;
    
    
    /**
     * AgrupadorModuloResource
     * @param agrupadorService
     */
	 public AgrupadorModuloResource(AgrupadorModuloService agrupadorModuloService) {
	        this.agrupadorModuloService = agrupadorModuloService;
	    }
	 
	 
	 
	 /**
	  * Post agrupadorModulo
	  * @param agrupadorModulo
	  * @return
	  * @throws URISyntaxException
	  */
	    @PostMapping(path = RestConstants.PATH_AGRUPADOR_MODULO)
	    public ResponseEntity<AgrupadorModulo> createAgrupadorModulo(@RequestBody AgrupadorModulo agrupadorModulo) throws URISyntaxException {
	        log.debug("REST request to save AgrupadorModulo : {}", agrupadorModulo);
	       
	        AgrupadorModulo result = agrupadorModuloService.save(agrupadorModulo);
	        return ResponseEntity.created(new URI("/api/agrupador/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    
	 
	    /**
	     * Update AgrupadorModulo
	     * @param agrupadorModulo
	     * @return
	     * @throws URISyntaxException
	     */
	    @PutMapping(path = RestConstants.PATH_AGRUPADOR_MODULO)
	    public ResponseEntity<AgrupadorModulo> updateAgrupadorModulo(@RequestBody AgrupadorModulo agrupadorModulo) throws URISyntaxException {
	        log.debug("REST request to update AgrupadorModulo : {}", agrupadorModulo);
	        if (agrupadorModulo.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        AgrupadorModulo result = agrupadorModuloService.save(agrupadorModulo);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }

	    
	 
	    /**
	     * Get agrupadorModulo
	     * @param pageable
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_AGRUPADOR_MODULO)
	    public ResponseEntity<List<AgrupadorModulo>> getAllAgrupadorModulo(Pageable pageable) {
	        log.debug("REST request to get a page of AgrupadorModulo");
	        Page<AgrupadorModulo> page = agrupadorModuloService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    
	    /**
	     * Get  by id
	     * @param id
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_AGRUPADOR_MODULO_ID)
	    public ResponseEntity<AgrupadorModulo> getAgrupadorModulo(@PathVariable Long id) {
	        log.debug("REST request to get Agrupador : {}", id);
	        Optional<AgrupadorModulo> agrupadorModulo = agrupadorModuloService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(agrupadorModulo);
	    }
	    
	  
	    /**
	     * Delete by  id
	     * @param id
	     * @return
	     */
	    @DeleteMapping(path = RestConstants.PATH_AGRUPADOR_MODULO_ID)
	    public ResponseEntity<Void> deleteAgrupadorModulo(@PathVariable Long id) {
	        log.debug("REST request to delete agrupadorModulo : {}", id);
	        agrupadorModuloService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}
