package org.constructor.web.rest;

import org.constructor.domain.Ficha;
import org.constructor.service.FichaService;
import org.constructor.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.constructor.domain.Ficha}.
 */
@RestController
@RequestMapping("/api")
public class FichaResource {

    private final Logger log = LoggerFactory.getLogger(FichaResource.class);

    private static final String ENTITY_NAME = "ficha";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final FichaService fichaService;

    public FichaResource(FichaService fichaService) {
        this.fichaService = fichaService;
    }

    /**
     * {@code POST  /fichas} : Create a new ficha.
     *
     * @param ficha the ficha to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ficha, or with status {@code 400 (Bad Request)} if the ficha has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/fichas")
    public ResponseEntity<Ficha> createFicha(@RequestBody Ficha ficha) throws URISyntaxException {
        log.debug("REST request to save Ficha : {}", ficha);
        if (ficha.getId() != null) {
            throw new BadRequestAlertException("A new ficha cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ficha result = fichaService.save(ficha);
        return ResponseEntity.created(new URI("/api/fichas/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /fichas} : Updates an existing ficha.
     *
     * @param ficha the ficha to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ficha,
     * or with status {@code 400 (Bad Request)} if the ficha is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ficha couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/fichas")
    public ResponseEntity<Ficha> updateFicha(@RequestBody Ficha ficha) throws URISyntaxException {
        log.debug("REST request to update Ficha : {}", ficha);
        if (ficha.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ficha result = fichaService.save(ficha);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ficha.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /fichas} : get all the fichas.
     *

     * @param pageable the pagination information.
     * @param eagerload flag to eager load entities from relationships (This is applicable for many-to-many).
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of fichas in body.
     */
    @GetMapping("/fichas")
    public ResponseEntity<List<Ficha>> getAllFichas(Pageable pageable, @RequestParam(required = false, defaultValue = "false") boolean eagerload) {
        log.debug("REST request to get a page of Fichas");
        Page<Ficha> page;
        if (eagerload) {
            page = fichaService.findAllWithEagerRelationships(pageable);
        } else {
            page = fichaService.findAll(pageable);
        }
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /fichas/:id} : get the "id" ficha.
     *
     * @param id the id of the ficha to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ficha, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/fichas/{id}")
    public ResponseEntity<Ficha> getFicha(@PathVariable Long id) {
        log.debug("REST request to get Ficha : {}", id);
        Optional<Ficha> ficha = fichaService.findOne(id);
        return ResponseUtil.wrapOrNotFound(ficha);
    }

    /**
     * {@code DELETE  /fichas/:id} : delete the "id" ficha.
     *
     * @param id the id of the ficha to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/fichas/{id}")
    public ResponseEntity<Void> deleteFicha(@PathVariable Long id) {
        log.debug("REST request to delete Ficha : {}", id);
        fichaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
