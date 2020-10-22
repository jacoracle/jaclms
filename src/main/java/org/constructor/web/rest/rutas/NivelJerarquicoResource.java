/**
 * 
 */
package org.constructor.web.rest.rutas;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.service.dto.rutas.NivelJerarquicoDTO;
import org.constructor.service.rutas.NivelJerarquicoService;
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
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
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
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping(RestConstants.PATH_API)
public class NivelJerarquicoResource {
	
	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(NivelJerarquicoResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "nivelJerarquico";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * nivelJerarquicoService
     */
    @Autowired
	private NivelJerarquicoService nivelJerarquicoService;
    
    /**
     * NivelJerarquicoResource
     * @param nivelJerarquicoService
     */
	 public NivelJerarquicoResource(NivelJerarquicoService nivelJerarquicoService) {
	        this.nivelJerarquicoService = nivelJerarquicoService;
	    }
	 
	
	 /**
	  * nivelJerarquico Post
	  * @param nivelJerarquico
	  * @return
	  * @throws URISyntaxException
	  */
	    @PostMapping(path = RestConstants.PATH_NIVEL_JERARQUICO)
	    public ResponseEntity<NivelJerarquico> createNivelJerarquico(@RequestBody NivelJerarquicoDTO nivelJerarquico) throws URISyntaxException {
	        log.debug("REST request to save entro al servicio : {}", nivelJerarquico);

	        log.debug("REST request to save nivelJerarquico : {}", nivelJerarquico);
	        if (nivelJerarquico.getId() != null) {
	            throw new BadRequestAlertException("A new nivel Jerarquico cannot already have an ID", ENTITY_NAME, "idexists");
	        }
	        NivelJerarquico result = nivelJerarquicoService.save(nivelJerarquico);
	        log.debug("REST request to save result : {}", result);
	        return ResponseEntity.created(new URI("/api/nivel-jerarquico/" + result.getId()))
	            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	    /**
	     * Update NivelJerarquicos
	     * @param nivelJerarquicoDTO
	     * @return
	     * @throws Exception
	     */
	    @PutMapping(path = RestConstants.PATH_NIVEL_JERARQUICO)
	    public ResponseEntity<Optional<NivelJerarquico>> updateNivelJerarquicos(@RequestBody NivelJerarquicoDTO nivelJerarquicoDTO) throws Exception {
	        log.debug("REST request to update NivelJerarquico : {}", nivelJerarquicoDTO);

	        if (nivelJerarquicoDTO.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        if (nivelJerarquicoDTO.getAgrupadores() == null) {
	        	 throw new BadRequestAlertException("Invalid agrupadores", ENTITY_NAME, "null content");
	        }
			
	        Optional<NivelJerarquico> result = nivelJerarquicoService.updateNivelJerarquico(nivelJerarquicoDTO);
	        Optional<NivelJerarquico> nivel = nivelJerarquicoService.findOne(result.get().getId());
	        log.debug("Update nivel  : {}", nivel);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.get().getId().toString()))
	            .body(nivel);
	    }
	   
	   
	    
	   
	    /**
	     * Get NivelJerarquico
	     * @param pageable
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_NIVEL_JERARQUICO)
	    public ResponseEntity<List<NivelJerarquico>> getAllNivelJerarquico(Pageable pageable) {
	        log.debug("REST request to get a page of NivelJerarquico");
	        Page<NivelJerarquico> page = nivelJerarquicoService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    
	    /**
	     * NivelJerarquico
	     * Get by id
	     * @param id
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_NIVEL_JERARQUICO_ID)
	    public ResponseEntity<NivelJerarquico> getNivelJerarquico(@PathVariable Long id) {
	        log.debug("REST request to get RutasAprendizaje : {}", id);
	        Optional<NivelJerarquico> nivel = nivelJerarquicoService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(nivel);
	    }
	    
	    
	    /**
	     * NivelJerarquico
	     * Delete by id
	     * @param id
	     * @return
	     */
	    @DeleteMapping(path = RestConstants.PATH_NIVEL_JERARQUICO_ID)
	    public ResponseEntity<Void> deleteNivelJerarquico(@PathVariable Long id) {
	        log.debug("REST request to delete NivelJerarquico : {}", id);
	        nivelJerarquicoService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}


