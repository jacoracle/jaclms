/**
 * 
 */
package org.constructor.module.web.rest;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.module.domain.Modulo;
import org.constructor.service.ModuloService;
import org.constructor.service.dto.ModuloDTO;
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
import org.springframework.security.core.Authentication;
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
public class ModuloResource {

	
	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ModuloResource.class);

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
     * moduloService
     */
    @Autowired
	private ModuloService moduloService;
    
    /**
     * ModuloResource
     * @param moduloService
     */
	 public ModuloResource(ModuloService moduloService) {
	        this.moduloService = moduloService;
	    }
	 
	 /**
	     * {@code POST  /modulo} : Create a new modulo.
	     *
	     * @param modulo the modulo to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new modulo, or with status {@code 400 (Bad Request)} if the modulo has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping("/modulos")
	    public ResponseEntity<Modulo> createModulo(@RequestBody Modulo modulo) throws URISyntaxException {
	        log.debug("REST request to save Modulo : {}", modulo);
	        if (modulo.getId() != null) {
	            throw new BadRequestAlertException("A new modulo cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        Modulo result = moduloService.save(modulo);
	        return ResponseEntity.created(new URI("/api/modulo/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * 
	     * @param authentication
	     * @param module
	     * @param file
	     * @return
	     * @throws IOException
	     */
	    @PostMapping(path = RestConstants.PATH_MODULO)
		public ResponseEntity<ModuloDTO> createModulos(Authentication authentication,
				@RequestBody Modulo module)
				throws IOException {
			log.debug("REST request to save Module : {}", module);
			if (module == null) {
				throw new BadRequestAlertException("A new module cannot is empty", ENTITY_NAME, "");
			}
			log.debug("REST request to mo : {}", module);
			ModuloDTO result = moduloService.save(authentication, module);
			log.debug("result : {}",result);

			return new ResponseEntity<>(result, HttpStatus.OK);
		}

	    
	    /**
	     * {@code PUT  /modulo} : Updates an existing modulo.
	     *
	     * @param modulo the modulo to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated modulo,
	     * or with status {@code 400 (Bad Request)} if the modulo is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the modulo couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping(path = RestConstants.PATH_MODULO)
	    public ResponseEntity<Modulo> updateModulo(@RequestBody Modulo modulo) throws URISyntaxException {
	        log.debug("REST request to update Modulo : {}", modulo);
	        if (modulo.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        Modulo result = moduloService.save(modulo);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code GET  /modulo} : get all the modulo.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of modulo in body.
	     */
	    @GetMapping(path = RestConstants.PATH_MODULO_ALL)
	    public ResponseEntity<List<Modulo>> getAllModulo(Pageable pageable) {
	        log.debug("REST request to get a page of modulo");
	        Page<Modulo> page = moduloService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /modulo/:id} : get the "id" modulo.
	     *
	     * @param id the id of the modulo to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the modulo, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping(path = RestConstants.PATH_MODULO_ID)
	    public ResponseEntity<Modulo> getModulo(@PathVariable Long id) {
	        log.debug("REST request to get modulo : {}", id);
	        Optional<Modulo> tipoModulo = moduloService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(tipoModulo);
	    }
	    
	    /**
	     * 
	     * @param authentication
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_MODULO)
	    public ResponseEntity<List<Modulo>> getAllModuleUser(Authentication authentication ) {
	        log.debug("REST request to get a page of Module by User");
	        List<Modulo> page = moduloService.findAllModuloUserId(authentication);
	        return ResponseEntity.ok().body(page);
	    }
	    
	    /**
	     * {@code DELETE  /modulo/:id} : delete the "id" modulo.
	     *
	     * @param id the id of the modulo to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping(path = RestConstants.PATH_MODULO_ID)
	    public ResponseEntity<Void> deleteModulo(@PathVariable Long id) {
	        log.debug("REST request to delete modulo : {}", id);
	        moduloService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}
