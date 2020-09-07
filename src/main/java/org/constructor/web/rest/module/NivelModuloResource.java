package org.constructor.web.rest.module;

import java.util.List;
import java.util.Optional;

import org.constructor.domain.module.NivelModulo;
import org.constructor.response.NivelJerarquicoModuloResponse;
import org.constructor.response.NivelJerarquicoResponse;
import org.constructor.service.dto.module.NivelJerarquicoModuloDTO;
import org.constructor.service.dto.module.NivelModuloDTO;
import org.constructor.service.module.NivelModuloService;
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
 * REST controller for managing {@link org.constructor.domain.module.NivelModulo}.
 */
@RestController
@RequestMapping("/api")
public class NivelModuloResource {
	
	/**
	 * Logger
	 */
	 private final Logger log = LoggerFactory.getLogger(NivelModuloResource.class);

	 /**
	  * NivelModulo
	  */
	 private static final String ENTITY_NAME = "NivelModulo";
	 
	 /**
	  * String applicationName
	  */
	 @Value("${jhipster.clientApp.name}")
	    private String applicationName;
	 
	 /**
	  * Service
	  */
	 @Autowired
	 private NivelModuloService nivelModuloService;
	 
	 /**
	  * NivelModuloResource
	  * 
	  * @param nivelModuloService
	  */
	 public NivelModuloResource(NivelModuloService nivelModuloService) {
	        this.nivelModuloService = nivelModuloService;
	    }
	 
	     /**
	     * {@code POST  /nivel-jerarquico} : Create a new nivelJerarquico.
	     *
	     * @param nivelJerarquico to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelJerarquico, or with status {@code 400 (Bad Request)} if the nivelJerarquico has already an ID.
	     * @throws Exception 
	     */
	    @PostMapping("curso/nivel-jerarquico")
	    public ResponseEntity<NivelJerarquicoResponse> createNivelJerarquico(@RequestBody NivelModuloDTO nivelModuloDTO) throws Exception {
	        log.debug("REST request to save NivelModulo : {}", nivelModuloDTO);
	        if (nivelModuloDTO == null) {
	            throw new BadRequestAlertException("A new Nivel Jerarquico cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        NivelModulo result = nivelModuloService.saveCurso(nivelModuloDTO);
	        NivelJerarquicoResponse nivelJerarquico = nivelModuloService.findOneCurso(result.getId());
	        nivelJerarquico.setCursoId(nivelModuloDTO.getCursoId());
	        nivelJerarquico.setOrden(nivelModuloDTO.getOrden());
	        log.debug("result : {}", nivelJerarquico);
	        return ResponseUtil.wrapOrNotFound(Optional.of(nivelJerarquico));
	    }
	    
	    /**
	     * {@code PUT  /nivel-jerarquico} : Updates an existing nivelJerarquico.
	     *
	     * @param nivelJerarquico the nivelJerarquico to update.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated nivelJerarquico,
	     * or with status {@code 400 (Bad Request)} if the nivelJerarquico is not valid,
	     * or with status {@code 500 (Internal Server Error)} if the nivelJerarquico couldn't be updated.
	     * @throws Exception 
	     */
	    @PutMapping("curso/nivel-jerarquico")
	    public ResponseEntity<NivelJerarquicoResponse> updateNivelJerarquico(@RequestBody NivelModuloDTO nivelModuloDTO) throws Exception {
	        log.debug("REST request to update nivelJerarquico : {}", nivelModuloDTO);
	        if (nivelModuloDTO == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        Optional<NivelModulo> result = nivelModuloService.updateNivelJerarquicoCurso(nivelModuloDTO);
	        NivelJerarquicoResponse nivelJerarquico = nivelModuloService.findOneCurso(result.get().getId());
	        nivelJerarquico.setCursoId(nivelModuloDTO.getCursoId());
	        log.debug("Update Level  : {}", nivelJerarquico);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
	            .body(nivelJerarquico);
	    }
	    /**
	     * {@code GET  /nivel-jerarquico/:id} : get the "id" nivelJerarquico.
	     *
	     * @param id the id of the nivelJerarquico to retrieve.
	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the nivelJerarquico, or with status {@code 404 (Not Found)}.
	     */
	    @GetMapping("curso/nivel-jerarquico/{id}")
	    public ResponseEntity<NivelJerarquicoResponse> getNivelJerarquico(@PathVariable Long id) {
	        log.debug("REST request to get NivelModulo : {}", id);
	        NivelJerarquicoResponse nivelJerarquico = nivelModuloService.findOneCurso(id);
	        return ResponseUtil.wrapOrNotFound(Optional.of(nivelJerarquico));
	    }
	    
	    /**
	     * {@code POST  modulo/nivel-jerarquico} : Create a new nivelJerarquico.
	     *
	     * @param nivelJerarquico to create.
	     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new nivelJerarquico, or with status {@code 400 (Bad Request)} if the nivelJerarquico has already an ID.
	     * @throws Exception 
	     */
	    @PostMapping("modulo/nivel-jerarquico")
	    public ResponseEntity<NivelJerarquicoModuloResponse> createNivelJerarquicoModulo(@RequestBody NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception {
	        log.debug("REST request to save NivelJerarquicoModulo : {}", nivelJerarquicoModulo);
	        if (nivelJerarquicoModulo == null) {
	            throw new BadRequestAlertException("A new Nivel Jerarquico cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        NivelModulo result = nivelModuloService.saveModulo(nivelJerarquicoModulo);
	        NivelJerarquicoModuloResponse nivelJerarquicoModule = nivelModuloService.findOneModulo(result.getId());
	        nivelJerarquicoModule.setModuloId(nivelJerarquicoModulo.getModuloId());
	        nivelJerarquicoModule.setOrden(nivelJerarquicoModulo.getOrden());
	        log.debug("result : {}", nivelJerarquicoModule);
	        return ResponseUtil.wrapOrNotFound(Optional.of(nivelJerarquicoModule));
	    }
	    
	    
	    /**
	     * updateNivelJerarquicoModulo
	     * @param nivelJerarquicoModulo
	     * @return
	     * @throws Exception
	     */
	    @PutMapping("modulo/nivel-jerarquico")
	    public ResponseEntity<NivelJerarquicoModuloResponse> updateNivelJerarquicoModulo(@RequestBody NivelJerarquicoModuloDTO nivelJerarquicoModulo) throws Exception {
	        log.debug("REST request to update nivelJerarquicoModulo : {}", nivelJerarquicoModulo);
	        if (nivelJerarquicoModulo == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        Optional<NivelModulo> result = nivelModuloService.updateNivelJerarquicoModule(nivelJerarquicoModulo);
	        NivelJerarquicoModuloResponse nivelJerarquico = nivelModuloService.findOneModulo(result.get().getId());
	        nivelJerarquico.setModuloId(nivelJerarquicoModulo.getModuloId());
	        log.debug("Update Level  : {}", nivelJerarquico);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
	            .body(nivelJerarquico);
	    }
	    
	    /**
	     * getNivelJerarquicoModule
	     * @param id
	     * @return
	     */
	    @GetMapping("modulo/nivel-jerarquico/{id}")
	    public ResponseEntity<NivelJerarquicoModuloResponse> getNivelJerarquicoModule(@PathVariable Long id) {
	        log.debug("REST request to get NivelModulo : {}", id);
	        NivelJerarquicoModuloResponse nivelJerarquico = nivelModuloService.findOneModulo(id);
	        return ResponseUtil.wrapOrNotFound(Optional.of(nivelJerarquico));
	    }
	   
	    
	    /**
	     * {@code GET  /nivel-jerarquico} : get all the nivelJerarquico.
	     *

	     * @param pageable the pagination information.

	     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of nivelJerarquico in body.
	     */
	    @GetMapping("/nivel-jerarquico")
	    public ResponseEntity<List<NivelModulo>> getAllNivelJerarquico(Pageable pageable) {
	        log.debug("REST request to get a page of NivelModulo");
	        Page<NivelModulo> page = nivelModuloService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	  
	    
	    /**
	     * {@code DELETE  /nivel-jerarquico/:id} : delete the "id" nivelJerarquico.
	     *
	     * @param id the id of the nivelJerarquico to delete.
	     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
	     */
	    @DeleteMapping("/nivel-jerarquico/{id}")
	    public ResponseEntity<Void> deleteNivelJerarquico(@PathVariable Long id) {
	        log.debug("REST request to delete NivelModulo : {}", id);
	        nivelModuloService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}
