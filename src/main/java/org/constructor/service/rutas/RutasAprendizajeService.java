/**
 * 
 */
package org.constructor.service.rutas;

import java.io.IOException;
import java.util.List;

import org.constructor.domain.rutas.RutasAprendizaje;
import org.constructor.service.dto.rutas.DTORutaAprendizaje;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.core.Authentication;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Edukai
 *
 */
public interface RutasAprendizajeService {

	
	/**
     * Save a RutasAprendizaje.
     *
     * @param rutasAprendizaje the entity to save.
     * @return the persisted entity.
     */
    RutasAprendizaje save(RutasAprendizaje rutasAprendizaje);
    
    /**
     * RutasAprendizaje
     * @param authentication
     * @param rutasDTO
     * @param file
     * @return
     */
    RutasAprendizaje save(Authentication authentication, RutasAprendizaje rutasDTO, MultipartFile file);

    /**
     * findAllRutaUserId
     * @param authentication
     * @return
     */
    List<RutasAprendizaje> findAllRutaUserId(Authentication authentication);
    /**
     * Get all the versions.
     *
     * @param pageable the pagination information.
     * @return the list of entities.
     */
    Page<RutasAprendizaje> findAll(Pageable pageable);


    /**
     * Get the "id" RutasAprendizaje.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    DTORutaAprendizaje findOne(Long id);

    /**
     * Delete the "id" RutasAprendizaje.
     *
     * @param id the id of the entity.
     */
    void delete(Long id) throws IOException;
}
