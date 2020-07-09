/**
 * 
 */
package org.constructor.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.Contenido;
import org.constructor.service.ContenidoService;
import org.constructor.service.dto.ContenidoDTO;
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
public class ContenidoResource {

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(ContenidoResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "contenido";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * ContenidoService
     */
    @Autowired
	private ContenidoService contenidoService;
    
    
    /**
     * ContenidoResource
     * 
     * @param ContenidoService
     */
	 public ContenidoResource(ContenidoService contenidoService) {
	        this.contenidoService = contenidoService;
	    }
	 
	 /**
	     * {@code POST  /contenido} : Create a new contenido.
	     *
	     * @param contenido the contenido to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new contenido, or with status {@code 400 (Bad Request)} if the contenido has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping(path = RestConstants.PATH_CONTENIDO)
	    public ResponseEntity<Contenido> createContenido(@RequestBody Contenido contenido) throws URISyntaxException {
	        log.debug("REST request to save Contenido : {}", contenido);
	        Contenido result = contenidoService.save(contenido);
	        return ResponseEntity.created(new URI("/api/contenido/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code PUT  /contenido} : Updates an existing contenido.
	     *
	     * @param contenido the contenido to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated contenido,
	     * or with status {@code 400 (Bad Request)} if the contenido is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the contenido couldn't be updated.
	     * @throws Exception 
	     */
	    @PutMapping(path = RestConstants.PATH_CONTENIDO)
	    public ResponseEntity<Optional<Contenido>> updateContenidos(@RequestBody ContenidoDTO contenidoDTO) throws Exception {
	        log.debug("REST request to update Contenido : {}", contenidoDTO);

	        if (contenidoDTO.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        if (contenidoDTO.getContenido() == null) {
	        	 throw new BadRequestAlertException("Invalid content", ENTITY_NAME, "null content");
	        }
			
	        Optional<Contenido> result = contenidoService.updateContenido(contenidoDTO);
	        Optional<Contenido> contenido = contenidoService.findOne(result.get().getId());
	        log.debug("Update Level  : {}", contenido);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
	            .body(contenido);
	    }
	    
	    /**
	     * {@code GET  /contenido} : get all the contenido.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of contenido in body.
	     */
	    @GetMapping(path = RestConstants.PATH_CONTENIDO)
	    public ResponseEntity<List<Contenido>> getAllContenidos(Pageable pageable) {
	        log.debug("REST request to get a page of Contenido");
	        Page<Contenido> page = contenidoService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /contenido/:id} : get the "id" contenido.
	     *
	     * @param id the id of the contenido to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the contenido, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("/contenido/{id}")
	    public ResponseEntity<Optional<Contenido>> getContenido(@PathVariable Long id) {
	        log.debug("REST request to get contenido : {}", id);
	        Optional<Contenido> contenido = contenidoService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(Optional.of(contenido));
	    }
	    
	    /**
	     * {@code DELETE  /contenido/:id} : delete the "id" contenido.
	     *
	     * @param id the id of the contenido to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping("/contenido/{id}")
	    public ResponseEntity<Contenido> deleteContenido(@PathVariable Long id) {
	        log.debug("REST request to delete Contenido : {}", id);
	        contenidoService.delete(id);
	        return ResponseEntity.noContent() .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME,  id.toString())).build();
	    }
}
