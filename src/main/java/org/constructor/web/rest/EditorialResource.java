package org.constructor.web.rest;

import org.constructor.domain.Editorial;
import org.constructor.service.EditorialService;
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
 * REST controller for managing {@link org.constructor.domain.Editorial}.
 */
@RestController
@RequestMapping("/api")
public class EditorialResource {

    private final Logger log = LoggerFactory.getLogger(EditorialResource.class);

    private static final String ENTITY_NAME = "editorial";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final EditorialService editorialService;

    public EditorialResource(EditorialService editorialService) {
        this.editorialService = editorialService;
    }

    /**
     * {@code POST  /editorials} : Create a new editorial.
     *
     * @param editorial the editorial to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new editorial, or with status {@code 400 (Bad Request)} if the editorial has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/editorials")
    public ResponseEntity<Editorial> createEditorial(@RequestBody Editorial editorial) throws URISyntaxException {
        log.debug("REST request to save Editorial : {}", editorial);
        if (editorial.getId() != null) {
            throw new BadRequestAlertException("A new editorial cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Editorial result = editorialService.save(editorial);
        return ResponseEntity.created(new URI("/api/editorials/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /editorials} : Updates an existing editorial.
     *
     * @param editorial the editorial to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated editorial,
     * or with status {@code 400 (Bad Request)} if the editorial is not valid,
     * or with status {@code 500 (Internal Server Error)} if the editorial couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/editorials")
    public ResponseEntity<Editorial> updateEditorial(@RequestBody Editorial editorial) throws URISyntaxException {
        log.debug("REST request to update Editorial : {}", editorial);
        if (editorial.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Editorial result = editorialService.save(editorial);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, editorial.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /editorials} : get all the editorials.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of editorials in body.
     */
    @GetMapping("/editorials")
    public ResponseEntity<List<Editorial>> getAllEditorials(Pageable pageable) {
        log.debug("REST request to get a page of Editorials");
        Page<Editorial> page = editorialService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }

    /**
     * {@code GET  /editorials/:id} : get the "id" editorial.
     *
     * @param id the id of the editorial to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the editorial, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/editorials/{id}")
    public ResponseEntity<Editorial> getEditorial(@PathVariable Long id) {
        log.debug("REST request to get Editorial : {}", id);
        Optional<Editorial> editorial = editorialService.findOne(id);
        return ResponseUtil.wrapOrNotFound(editorial);
    }

    /**
     * {@code DELETE  /editorials/:id} : delete the "id" editorial.
     *
     * @param id the id of the editorial to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/editorials/{id}")
    public ResponseEntity<Void> deleteEditorial(@PathVariable Long id) {
        log.debug("REST request to delete Editorial : {}", id);
        editorialService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
