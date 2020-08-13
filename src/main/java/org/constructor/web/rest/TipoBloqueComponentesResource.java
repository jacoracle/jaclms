package org.constructor.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.TipoBloqueComponentes;
import org.constructor.service.TipoBloqueComponentesService;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.constructor.domain.TipoBloqueComponente}.
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET})
@RequestMapping("/api")
public class TipoBloqueComponentesResource {
	
	private final Logger log = LoggerFactory.getLogger(TipoBloqueComponentesResource.class);

    private static final String ENTITY_NAME = "TipoBloqueComponentesResource";
    
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    @Autowired
	private TipoBloqueComponentesService tipoBloqueComponentesService;
    
	 public TipoBloqueComponentesResource(TipoBloqueComponentesService tipoBloqueComponentesService) {
	        this.tipoBloqueComponentesService = tipoBloqueComponentesService;
	    }
	 
	 /**
	     * {@code POST  /tipo-bloque-componentes} : Create a new tipoBloqueComponentes.
	     *
	     * @param tipoBloqueComponente the tipoBloqueComponentes to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new tipoBloqueComponentes, or with status {@code 400 (Bad Request)} if the tipoBloqueComponente has already an ID.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PostMapping("/tipo-bloque-componentes")
	    public ResponseEntity<TipoBloqueComponentes> createTipoBloqueComponentes(@RequestBody TipoBloqueComponentes tipoBloqueComponentes) throws URISyntaxException {
	        log.debug("REST request to save TipoBloqueComponente : {}", tipoBloqueComponentes);
	        if (tipoBloqueComponentes.getId() != null) {
	            throw new BadRequestAlertException("A new tipoBloqueComponente cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        TipoBloqueComponentes result = tipoBloqueComponentesService.save(tipoBloqueComponentes);
	        return ResponseEntity.created(new URI("/api/tipo-bloque-componentes/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code PUT  /tipo-bloque-componentes} : Updates an existing tipoBloqueComponente.
	     *
	     * @param tipoBloqueComponente the tipoBloqueComponente to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated tipoBloqueComponente,
	     * or with status {@code 400 (Bad Request)} if the tipoBloqueComponente is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the tipoBloqueComponente couldn't be updated.
	     * @throws URISyntaxException if the Location URI syntax is incorrect.
	     */
	    @PutMapping("/tipo-bloque-componentes")
	    public ResponseEntity<TipoBloqueComponentes> updateTipoBloqueComponentes(@RequestBody TipoBloqueComponentes tipoBloqueComponentes) throws URISyntaxException {
	        log.debug("REST request to update TipoBloqueComponente : {}", tipoBloqueComponentes);
	        if (tipoBloqueComponentes.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        TipoBloqueComponentes result = tipoBloqueComponentesService.save(tipoBloqueComponentes);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * {@code GET  /tipo-bloque-componentes} : get all the tipoBloqueComponente.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of tipoBloqueComponente in body.
	     */
	    @GetMapping("/tipo-bloque-componentes")
	    public ResponseEntity<List<TipoBloqueComponentes>> getAllTipoBloqueComponentes(Pageable pageable) {
	        log.debug("REST request to get a page of TipoBloqueComponente");
	        Page<TipoBloqueComponentes> page = tipoBloqueComponentesService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /tipo-bloque-componente/:id} : get the "id" tipoBloqueComponente.
	     *
	     * @param id the id of the tipoBloqueComponente to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the tipoBloqueComponente, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("/tipo-bloque-componentes/{id}")
	    public ResponseEntity<TipoBloqueComponentes> getTipoBloqueComponentes(@PathVariable Long id) {
	        log.debug("REST request to get TipoBloqueComponente : {}", id);
	        Optional<TipoBloqueComponentes> tipoBloqueComponentes = tipoBloqueComponentesService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(tipoBloqueComponentes);
	    }
	    
	    /**
	     * {@code DELETE  /tipo-bloque-componente/:id} : delete the "id" tipoBloqueComponente.
	     *
	     * @param id the id of the tipoBloqueComponente to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping("/tipo-bloque-componentes/{id}")
	    public ResponseEntity<Void> deleteTipoBloqueComponente(@PathVariable Long id) {
	        log.debug("REST request to delete TipoBloqueComponente : {}", id);
	        tipoBloqueComponentesService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }

}
