/**
 * 
 */
package org.constructor.service.impl.rutas;

import java.util.Optional;

import org.constructor.domain.rutas.RutasAprendizaje;
import org.constructor.repository.rutas.RutasAprendizajeRepository;
import org.constructor.service.rutas.RutasAprendizajeService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**
 * @author Edukai
 *
 */
@Service
@Transactional
public class RutasAprendizajeServiceImpl  implements RutasAprendizajeService{
	
	/**
	 * RutasAprendizajeRepository
	 */
	private final RutasAprendizajeRepository rutasAprendizajeRepository;
	
	/**
	 * RutasAprendizajeServiceImpl.
	 *
	 * @param rutasAprendizajeRepository the rutas aprendizaje repository
	 */
	public RutasAprendizajeServiceImpl(RutasAprendizajeRepository rutasAprendizajeRepository) {
        this.rutasAprendizajeRepository = rutasAprendizajeRepository;
    }
	

	/**
	 * Save  RutasAprendizaje
	 */
	@Override
	public RutasAprendizaje save(RutasAprendizaje rutasAprendizaje) {
		return rutasAprendizajeRepository.save(rutasAprendizaje);
	}

	/**
	 * finAll RutasAprendizaje
	 */
	@Override
	public Page<RutasAprendizaje> findAll(Pageable pageable) {
		return rutasAprendizajeRepository.findAll(pageable) ;
	}

	/**
	 * finOne RutasAprendizaje
	 */
	@Override
	public Optional<RutasAprendizaje> findOne(Long id) {
		return rutasAprendizajeRepository.findById(id);
	}

	/**
	 * Delete RutasAprendizaje
	 */
	@Override
	public void delete(Long id) {
		rutasAprendizajeRepository.deleteById(id);
	}

}
