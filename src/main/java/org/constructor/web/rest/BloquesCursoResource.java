/**
 * 
 */
package org.constructor.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;


import org.constructor.domain.BloquesCurso;
import org.constructor.service.BloquesCursoService;
import org.constructor.service.dto.BloquesCursoDTO;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
public class BloquesCursoResource {

	

	/**
	 * Logger
	 */
    private final Logger log = LoggerFactory.getLogger(BloquesCursoResource.class);

    /**
     * ENTITY_NAME 
     */
    private static final String ENTITY_NAME = "bloques_curso";

    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    /**
     * BloquesCursoService
     */
    private final BloquesCursoService bloquesCursoService;
    
    /**
     * BloquesCursoResource
     *  
     * @param bloquesCursoService
     */
    public BloquesCursoResource(BloquesCursoService bloquesCursoService) {
        this.bloquesCursoService = bloquesCursoService;
    }
    
    /**
     * Post  bloquesCurso
     * 
     * @param bloquesCurso
     * @return
     * @throws URISyntaxException
     */
    @PostMapping(path = RestConstants.PATH_BLOQUES_CURSO)
    public ResponseEntity<BloquesCurso> createBloqueComponentes(@RequestBody BloquesCurso bloquesCurso) throws URISyntaxException {
        log.debug("REST request to save BloquesCurso : {}", bloquesCurso);
        if (bloquesCurso.getId() != null) {
            throw new BadRequestAlertException("A new component cannot already have an ID", ENTITY_NAME, "idexists");
        }
        BloquesCurso result = bloquesCursoService.save(bloquesCurso);
        return ResponseEntity.created(new URI("/api/bloquesCurso/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * PUT bloquesCurso
     * @param bloquesCurso
     * @return
     * @throws URISyntaxException
     */
    @PutMapping(path = RestConstants.PATH_BLOQUES_CURSO)
    public ResponseEntity<List<BloquesCurso>> updateBloquesCurso(@RequestBody List<BloquesCursoDTO> bloquesCurso) throws URISyntaxException {
        log.debug("REST request to update BloquesCurso : {}", bloquesCurso);
        List<BloquesCurso> result = bloquesCursoService.update(bloquesCurso); 
        return new ResponseEntity<>(result, HttpStatus.OK);
    }
    
    /**
     * Get  bloquesCurso
     * @param pageable
     * @return
     */
    @GetMapping(path = RestConstants.PATH_BLOQUES_CURSO)
    public ResponseEntity<List<BloquesCurso>> getAllBloquesCurso(Pageable pageable) {
        log.debug("REST request to get a page of BloquesCurso"); 
        Page<BloquesCurso> page = bloquesCursoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
        return ResponseEntity.ok().headers(headers).body(page.getContent());
    }
    
    /**
     * Get BloquesCurso by id
     * @param id
     * @return
     */
    @GetMapping(path = RestConstants.PATH_BLOQUE_CURSO_ID)
    public ResponseEntity<BloquesCurso> getBloquesCurso(@PathVariable Long id) {
        log.debug("REST request to get BloquesCurso : {}", id);
        Optional<BloquesCurso> autor = bloquesCursoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(autor);
    }
    
    
    /**
     * Delete BloquesCurso by id
     * 
     * @param id
     * @return
     */
    @DeleteMapping(path = RestConstants.PATH_BLOQUE_CURSO_ID)
    public ResponseEntity<Void> deleteBloquesCurso(@PathVariable Long id) {
        log.debug("REST request to delete BloquesCurso : {}", id);
        bloquesCursoService.delete(id);
        return ResponseEntity.noContent()
     		   .headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
