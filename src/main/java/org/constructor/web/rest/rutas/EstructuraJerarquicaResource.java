package org.constructor.web.rest.rutas;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Set;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.service.rutas.EstructuraJerarquicaService;
import org.constructor.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.jhipster.web.util.HeaderUtil;

/**
 * REST controller for managing {@link org.constructor.domain.EstructuraJerarquica}.
 */
@RestController
@RequestMapping("/api")
public class EstructuraJerarquicaResource {
	
	private final Logger log = LoggerFactory.getLogger(EstructuraJerarquicaResource.class);

	private static final String ENTITY_NAME = "EstructuraJerarquica";
	
	@Value("${jhipster.clientApp.name}")
    private String applicationName;
 
    @Autowired
	private EstructuraJerarquicaService estructuraJerarquicaService;
    
    public EstructuraJerarquicaResource(EstructuraJerarquicaService estructuraJerarquicaService) {
        this.estructuraJerarquicaService = estructuraJerarquicaService;
    }
    
    /**
     * {@code POST  /estructura-jerarquica} : Create a new EstructuraJerarquica.
     *
     * @param estructuraJerarquica to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new estructuraJerarquica, or with status {@code 400 (Bad Request)} if the estructuraJerarquica has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/estructura-jerarquica")
    public ResponseEntity<EstructuraJerarquica> createEstructuraJerarquica(@RequestBody EstructuraJerarquica estructuraJerarquica) throws URISyntaxException {
        log.debug("REST request to save EstructuraJerarquica : {}", estructuraJerarquica);
       
        EstructuraJerarquica result = estructuraJerarquicaService.save(estructuraJerarquica);
        return ResponseEntity.created(new URI("/api/roles-colaboradores/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }
    
    /**
     * {@code PUT  /estructura-jerarquica} : Updates an existing estructuraJerarquica.
     *
     * @param estructuraJerarquica the estructuraJerarquica to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated estructuraJerarquica,
     * or with status {@code 400 (Bad Request)} if the estructuraJerarquica is not valid,
     * or with status {@code 500 (Internal Server Error)} if the estructuraJerarquica couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/estructura-jerarquica")
    public ResponseEntity<EstructuraJerarquica> updateEstructuraJerarquica(@RequestBody EstructuraJerarquica estructuraJerarquica) throws URISyntaxException {
        log.debug("REST request to update estructuraJerarquica : {}", estructuraJerarquica);
        if (estructuraJerarquica.getSubNivelJerarquico() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        EstructuraJerarquica result = estructuraJerarquicaService.save(estructuraJerarquica);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, estructuraJerarquica.getSubNivelJerarquico().getNombre()))
            .body(result);
    }
    
    /**
     * {@code GET  /estructura-jerarquica} : get all the estructuraJerarquica.
     *

     * @param pageable the pagination information.

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of estructuraJerarquica in body.
     */
    @GetMapping("/estructura-jerarquica")
    public List<EstructuraJerarquica> getAllEstructuraJerarquica(Pageable pageable) {
        log.debug("REST request to get a page of EstructuraJerarquica");
        List<EstructuraJerarquica> page = estructuraJerarquicaService.findAll(pageable);
        return page;
    }
    
    /**
     * {@code GET  /estructura-jerarquica/:id} : get the "id" estructuraJerarquica.
     *
     * @param id the id of the estructuraJerarquica to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the estructuraJerarquica, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/estructura-jerarquica/{id}")
    public Set<EstructuraJerarquica> getNivelEstructuraJerarquica(@PathVariable Long id) {
        log.debug("REST request to get EstructuraJerarquica : {}", id);
        Set<EstructuraJerarquica> estructuraJerarquica = estructuraJerarquicaService.findByNivel(id);
        return estructuraJerarquica;
    }
    
    /**
     * {@code DELETE  /estructura-jerarquica/:id} : delete the "id" estructuraJerarquica.
     *
     * @param id the id of the estructuraJerarquica to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/estructura-jerarquica/{id}")
    public ResponseEntity<Void> deleteEstructuraJerarquica(@PathVariable Long id) {
        log.debug("REST request to delete EstructuraJerarquica : {}", id);
        estructuraJerarquicaService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
    
    
	
	
	

}
