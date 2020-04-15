package org.constructor.web.rest;

import org.constructor.domain.Colaborador;
import org.constructor.domain.RolesColaboradores;
import org.constructor.service.ColaboradorService;
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
import org.springframework.http.HttpStatus;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

/**
 * REST controller for managing {@link org.constructor.domain.Colaborador}.
 */
@RestController
@RequestMapping("/api")
public class ColaboradorResource {

    private final Logger log = LoggerFactory.getLogger(ColaboradorResource.class);

    private static final String ENTITY_NAME = "colaborador";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ColaboradorService colaboradorService;

    public ColaboradorResource(ColaboradorService colaboradorService) {
        this.colaboradorService = colaboradorService;
    }

    /**
     * {@code POST  /colaboradors} : Create a new colaborador.
     *
     * @param colaborador the colaborador to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new colaborador, or with status {@code 400 (Bad Request)} if the colaborador has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/colaboradors")
    public ResponseEntity<Colaborador> createColaborador(@RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to save Colaborador : {}", colaborador);
        if (colaborador.getId() != null) {
            throw new BadRequestAlertException("A new colaborador cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Colaborador result = colaboradorService.save(colaborador);
        return ResponseEntity.created(new URI("/api/colaboradors/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /colaboradors} : Updates an existing colaborador.
     *
     * @param colaborador the colaborador to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated colaborador,
     * or with status {@code 400 (Bad Request)} if the colaborador is not valid,
     * or with status {@code 500 (Internal Server Error)} if the colaborador couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/colaboradors")
    public ResponseEntity<Colaborador> updateColaborador(@RequestBody Colaborador colaborador) throws URISyntaxException {
        log.debug("REST request to update Colaborador : {}", colaborador);
        if (colaborador.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Colaborador result = colaboradorService.save(colaborador);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, colaborador.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /colaboradors} : get all the colaboradors.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of colaboradors in body.
     */
    @GetMapping("/colaboradors")
    public ResponseEntity<List<Colaborador>> getAllColaborador(Pageable pageable) {
        log.debug("REST request to get a page of Colaboradors"); 
        Page<Colaborador> page = colaboradorService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /colaboradors/:id} : get the "id" colaborador.
     *
     * @param id the id of the colaborador to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the colaborador, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/colaboradors/{id}")
    public ResponseEntity<Colaborador> getColaborador(@PathVariable Long id) {
        log.debug("REST request to get Colaborador : {}", id);
        Optional<Colaborador> colaborador = colaboradorService.findOne(id);
        return ResponseUtil.wrapOrNotFound(colaborador);
    }

    /**
     * {@code DELETE  /colaboradors/:id} : delete the "id" colaborador.
     *
     * @param id the id of the colaborador to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/colaboradors/{id}")
    public ResponseEntity<Void> deleteColaborador(@PathVariable Long id) {
        log.debug("REST request to delete Colaborador : {}", id);
        colaboradorService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
