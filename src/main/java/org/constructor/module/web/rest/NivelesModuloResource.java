/**
 * 
 */
package org.constructor.module.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

import org.constructor.module.domain.NivelesModulo;
import org.constructor.service.NivelesModuloService;
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

/**
 * @author Edukai
 *
 */
@RestController
@RequestMapping(RestConstants.PATH_API)
public class NivelesModuloResource {

	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(NivelesModuloResource.class);
	
	/**
	 * nivelesModulo
	 */
	private static final String ENTITY_NAME = "NivelesModulo";
	 
	/**
	 * applicationName
	 */
	@Value("${jhipster.clientApp.name}")
	    private String applicationName;
	
	/**
	 * NivelesModuloService
	 */
	@Autowired
	 private NivelesModuloService nivelesModuloService;

	/**
	 * NivelesModuloService
	 * 
	 * @param nivelesModuloService
	 */
	public NivelesModuloResource(NivelesModuloService nivelesModuloService) {
	        this.nivelesModuloService = nivelesModuloService;
	    }

	   /**
  * {@code POST  /niveles-modulo} : Create a new nivelesModulo.
  *
  * @param nivelesModulo to create.
  * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelesModulo, 
  * or with status {@code 400 (Bad Request)} if the nivelesModulo has already an ID.
  * @throws URISyntaxException if the Location URI syntax is incorrect.
  */
 @PostMapping("/niveles-modulo")
 public ResponseEntity<NivelesModulo> createNivelesModulo(@RequestBody NivelesModulo nivelesModulo) throws URISyntaxException {
     log.debug("REST request to save NivelesModulo : {}", nivelesModulo);
     if (nivelesModulo.getId() != null) {
         throw new BadRequestAlertException("A new Course Levels cannot already have an ID", ENTITY_NAME, "idexists");
     }
     NivelesModulo result = nivelesModuloService.save(nivelesModulo);
     return ResponseEntity.created(new URI("/api/niveles-modulo/" + result.getId()))
         .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getModulo().toString()))
         .body(result);
 }
 
 
 /**
  * {@code PUT  /niveles-modulo} : Updates an existing nivelesModulo.
  *
  * @param nivelesModulo the nivelesModulo to update.
  * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nivelesModulo,
  * or with status {@code 400 (Bad Request)} if the nivelesModulo is not valid,
  * or with status {@code 500 (Internal Server Error)} if the nivelesModulo couldn't be updated.
  * @throws URISyntaxException if the Location URI syntax is incorrect.
  */
 @PutMapping("/niveles-modulo")
 public ResponseEntity<NivelesModulo> updateNivelesModulo(@RequestBody NivelesModulo nivelesModulo) throws URISyntaxException {
     log.debug("REST request to update NivelesModulo : {}", nivelesModulo);
     if (nivelesModulo.getId() == null) {
         throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
     }
     NivelesModulo result = nivelesModuloService.save(nivelesModulo);
     return ResponseEntity.ok()
         .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, nivelesModulo.getModulo().getDescripcion().toString()))
         .body(result);
 }
 
 /**
  * {@code GET  /niveles-modulo} : get all the nivelesModulo.
  *
  * @param pageable the pagination information.
  * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nivelesModulo in body.
  */
 @GetMapping("/niveles-modulo")
 public ResponseEntity<List<NivelesModulo>> getAllNivelesModulo(Pageable pageable) {
     log.debug("REST request to get a page of NivelesModulo");
     Page<NivelesModulo> page = nivelesModuloService.findAll(pageable);
     HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
     return ResponseEntity.ok().headers(headers).body(page.getContent());
 }
 
 /**
  * {@code GET  /niveles-modulo/:id} : get the "id" nivelesModulo.
  *
  * @param id the id of the nivelesModulo to retrieve.
  * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nivelesModulo,
  *  or with status {@code 404 (Not Found)}.
  */
 @GetMapping("/niveles-modulo/{id}")
 public ResponseEntity<Set<NivelesModulo>> getNivelesModulo(@PathVariable Long id) {
     log.debug("REST request to get NivelesModulo  : {}", id);
     Set<NivelesModulo> nivelesModulo = nivelesModuloService.findByModulo(id);
     return ResponseEntity.ok().body(nivelesModulo);
 }
 
 /**
  * {@code DELETE  /niveles-modulo/:id} : delete the "id" nivelesModulo.
  *
  * @param id the id of the nivelesModulo to delete.
  * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
  */
 @DeleteMapping("/niveles-modulo/{id}")
 public ResponseEntity<Void> deleteNivelesModulo(@PathVariable Long id) {
     log.debug("REST request to delete NivelesModulo : {}", id);
     nivelesModuloService.delete(id);
     return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
 }
}
