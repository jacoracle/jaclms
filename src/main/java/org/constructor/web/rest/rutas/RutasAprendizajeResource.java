/**
 * 
 */
package org.constructor.web.rest.rutas;

import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

import org.constructor.domain.rutas.RutasAprendizaje;
import org.constructor.service.dto.rutas.RutasAprendizajeDTO;
import org.constructor.service.rutas.RutasAprendizajeService;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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
import io.jsonwebtoken.io.IOException;

/**
 * @author Edukai
 *
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET,RequestMethod.POST})
@RequestMapping(RestConstants.PATH_API)
public class RutasAprendizajeResource {
	
	
	/**
	 * 	Logger
	 */
	private final Logger log = LoggerFactory.getLogger(RutasAprendizajeResource.class);

	/**
	 * ENTITY_NAME
	 */
    private static final String ENTITY_NAME = "rutasAprendizaje";
    
    /**
     * applicationName
     */
    @Value("${jhipster.clientApp.name}")
    private String applicationName;
    
    /**
     * rutasAprendizajeService
     */
    @Autowired
	private RutasAprendizajeService rutasAprendizajeService;
    
    /**
     * RutasAprendizajeResource
     * @param rutasAprendizajeService
     */
	 public RutasAprendizajeResource(RutasAprendizajeService rutasAprendizajeService) {
	        this.rutasAprendizajeService = rutasAprendizajeService;
	    }
	 
	
	 /**
	  * RutasAprendizaje Post
	  * @param rutasAprendizaje
	  * @return
	  * @throws IOException
	  */
	    @PostMapping(path = RestConstants.PATH_RUTAS)
	    public ResponseEntity<RutasAprendizajeDTO> createRutasAprendizaje(Authentication authentication ,
	    		@RequestBody RutasAprendizaje rutasAprendizaje) throws IOException {
			log.debug("REST request to save rutasAprendizaje : {}", rutasAprendizaje);
			if (rutasAprendizaje == null) {
				throw new BadRequestAlertException("A new rutasAprendizaje cannot is empty", ENTITY_NAME, "");
			}
			log.debug("REST request to ruta : {}", rutasAprendizaje);
			RutasAprendizajeDTO result = rutasAprendizajeService.save(authentication, rutasAprendizaje);
			log.debug("result : {}",result);

			return new ResponseEntity<>(result, HttpStatus.OK);
	    }
	   
	    /**
	     * Put RutasAprendizaje
	     * @param temas
	     * @return
	     * @throws URISyntaxException
	     */
	    @PutMapping(path = RestConstants.PATH_RUTAS)
	    public ResponseEntity<RutasAprendizaje> updateRutasAprendizaje(@RequestBody RutasAprendizaje rutasAprendizaje) throws URISyntaxException {
	        log.debug("REST request to update RutasAprendizaje : {}", rutasAprendizaje);
	        if (rutasAprendizaje.getId() == null) {
	            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
	        }
	        RutasAprendizaje result = rutasAprendizajeService.save(rutasAprendizaje);
	        return ResponseEntity.ok()
	            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
	            .body(result);
	    }
	    
	   
	    /**
	     * Get rutasAprendizaje
	     * @param pageable
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_RUTAS_ALL)
	    public ResponseEntity<List<RutasAprendizaje>> getAllRutasAprendizaje(Pageable pageable) {
	        log.debug("REST request to get a page of RutasAprendizaje");
	        Page<RutasAprendizaje> page = rutasAprendizajeService.findAll(pageable);
	        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
	        return ResponseEntity.ok().headers(headers).body(page.getContent());
	    }
	    
	    
	    /**
	     * RutasAprendizaje
	     * Get by id
	     * @param id
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_RUTA_ID)
	    public ResponseEntity<RutasAprendizaje> getRutasAprendizaje(@PathVariable Long id) {
	        log.debug("REST request to get RutasAprendizaje : {}", id);
	        Optional<RutasAprendizaje> rutas = rutasAprendizajeService.findOne(id);
	        return ResponseUtil.wrapOrNotFound(rutas);
	    }
	    
	    /**
	     * 
	     * @param authentication
	     * @return
	     */
	    @GetMapping(path = RestConstants.PATH_RUTAS)
	    public ResponseEntity<List<RutasAprendizaje>> getAllrUTAeUser(Authentication authentication ) {
	        log.debug("REST request to get a page of Module by User");
	        List<RutasAprendizaje> page = rutasAprendizajeService.findAllRutaUserId(authentication);
	        return ResponseEntity.ok().body(page);
	    }
	    
	    
	    /**
	     * RutasAprendizaje
	     * Delete by id
	     * @param id
	     * @return
	     */
	    @DeleteMapping(path = RestConstants.PATH_RUTA_ID)
	    public ResponseEntity<Void> deleteRutasAprendizaje(@PathVariable Long id) {
	        log.debug("REST request to delete RutasAprendizaje : {}", id);
	        rutasAprendizajeService.delete(id);
	        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
	    }
}



