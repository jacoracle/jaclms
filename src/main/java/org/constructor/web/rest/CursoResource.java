package org.constructor.web.rest;

import org.constructor.domain.Curso;
import org.constructor.domain.CursoFicha;
import org.constructor.service.CursoService;
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

import com.fasterxml.jackson.databind.ObjectMapper;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link org.constructor.domain.Curso}.
 */
@RestController
@RequestMapping("/api")
public class CursoResource {

    private final Logger log = LoggerFactory.getLogger(CursoResource.class);

    private static final String ENTITY_NAME = "curso";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final CursoService cursoService;

    public CursoResource(CursoService cursoService) {
        this.cursoService = cursoService;
    }

    /**
     * {@code POST  /cursos} : Create a new curso.
     *
     * @param curso the curso to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new curso, or with status {@code 400 (Bad Request)} if the curso has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
	@PostMapping("/cursos")
	public ResponseEntity<Curso> createCurso(@RequestBody Curso curso) throws URISyntaxException {
		log.debug("REST request to save Curso : {}", curso);
		if (curso.getId() != null) {
			throw new BadRequestAlertException("A new curso cannot already have an ID", ENTITY_NAME, "idexists");
		}
		Curso result = cursoService.save(curso);
		return ResponseEntity
				.created(new URI("/api/cursos/" + result.getId())).headers(HeaderUtil
						.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
				.body(result);
	}

	/**
	 * Creates the curso ficha.
	 *
	 * @param authentication the authentication
	 * @param course the course
	 * @param file the file
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@PostMapping("/curso-ficha")
	public ResponseEntity<CursoFicha> createCursoFicha(Authentication authentication,
			@RequestParam("course") String course, @RequestParam("file") Optional<MultipartFile> file)
			throws IOException {
		log.debug("REST request to save Curso : {}", course);
		if (course == null) {
			throw new BadRequestAlertException("A new curso cannot is empty", ENTITY_NAME, "");
		}
		CursoFicha cf = new ObjectMapper().readValue(course, CursoFicha.class);
		log.debug("REST request to cf : {}", cf);
		CursoFicha result = cursoService.save(authentication, cf, file.isPresent() ? file.get() : null);
		log.debug("result : {}", result);

		return new ResponseEntity<>(result, HttpStatus.OK);
	}
    
    /**
     * {@code PUT  /cursos} : Updates an existing curso.
     *
     * @param curso the curso to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated curso,
     * or with status {@code 400 (Bad Request)} if the curso is not valid,
     * or with status {@code 500 (Internal Server Error)} if the curso couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/cursos")
    public ResponseEntity<Curso> updateCurso(@RequestBody Curso curso) throws URISyntaxException {
        log.debug("REST request to update Curso : {}", curso);
        if (curso.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Curso result = cursoService.save(curso);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, curso.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /cursos} : get all the cursos.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of cursos in body.
     */
    @GetMapping("/cursos-all")
    public ResponseEntity<List<Curso>> getAllCursos(Pageable pageable) {
        log.debug("REST request to get a page of Cursos");
        Page<Curso> page = cursoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    @GetMapping("/cursos")
    public ResponseEntity<List<Curso>> getAllCursoUser(Authentication authentication ) {
        log.debug("REST request to get a page of Cursos by User");
        List<Curso> page = cursoService.findAllCursoUserId(authentication);
        return ResponseEntity.ok().body(page);
    }

    /**
     * {@code GET  /cursos/:id} : get the "id" curso.
     *
     * @param id the id of the curso to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the curso, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/cursos/{id}")
    public ResponseEntity<Curso> getCurso(@PathVariable Long id) {
        log.debug("REST request to get Curso : {}", id);
        Optional<Curso> curso = cursoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(curso);
    }

    /**
     * {@code DELETE  /cursos/:id} : delete the "id" curso.
     *
     * @param id the id of the curso to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     * @throws IOException 
     */
    @DeleteMapping("/cursos/{id}")
    public ResponseEntity<Void> deleteCurso(@PathVariable Long id) throws IOException {
        log.debug("REST request to delete Curso : {}", id);
        cursoService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
