package org.constructor.web.rest;

import java.util.List;
import java.util.Optional;

import org.constructor.domain.Pais;
import org.constructor.service.PaisService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link org.constructor.domain.Pais}.
 */
@RestController
@RequestMapping("/api")
public class PaisResource {
	
	 private final Logger log = LoggerFactory.getLogger(PaisResource.class);
	 
	 private static final String ENTITY_NAME = "pais";
	 
	 @Value("${jhipster.clientApp.name}")
	    private String applicationName;
	 
	 private final PaisService paisService;
	 
	   public PaisResource(PaisService paisService) {
	        this.paisService = paisService;
	    }
	   
	   /**
	     * {@code GET  /country} : get all the countries.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of Country in body.
	     */
	    @GetMapping("/pais")
	    public ResponseEntity<List<Pais>> getAllCountries(Pageable pageable) {
	        log.debug("REST request to get a page of countries");
	        Page<Pais> page = paisService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    /**
	     * {@code GET  /countries/:id} : get the "id" country.
	     *
	     * @param id the id of the country to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the country, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("/pais/{id}")
	    public ResponseEntity<Pais> getCountry(@PathVariable Long id) {
	        log.debug("REST request to get country : {}", id);
	        Optional<Pais> country = paisService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(country);
	    }
}
