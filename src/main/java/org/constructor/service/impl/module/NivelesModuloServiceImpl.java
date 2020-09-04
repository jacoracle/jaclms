/**
 * 
 */
package org.constructor.service.impl.module;

import java.util.Optional;
import java.util.Set;

import org.constructor.domain.module.NivelesModulo;
import org.constructor.repository.module.NivelesModuloRepository;
import org.constructor.service.module.NivelesModuloService;
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
public class NivelesModuloServiceImpl implements NivelesModuloService {

	
	/**
	 * NivelesModuloRepository
	 */
	private final NivelesModuloRepository nivelesModuloRepository;
	
	/**
	 * NivelesModuloServiceImpl.
	 *
	 * @param nivelesModuloRepository the niveles modulo repository
	 */
	public NivelesModuloServiceImpl(NivelesModuloRepository nivelesModuloRepository) {
        this.nivelesModuloRepository = nivelesModuloRepository;
    }
	
	/**
	 * Save  NivelesModulo
	 */
	@Override
	public NivelesModulo save(NivelesModulo nivelesModulo) {
		return nivelesModuloRepository.save(nivelesModulo);

	}

	/**
	 * finAll NivelesModulo
	 */
	@Override
	public Page<NivelesModulo> findAll(Pageable pageable) {
		return nivelesModuloRepository.findAll(pageable) ;

	}

	/**
	 * finOne NivelesModulo
	 */
	@Override
	public Optional<NivelesModulo> findOne(Long id) {
		return nivelesModuloRepository.findById(id);

	}

	/**
	 * findByCurso NivelesModulo
	 */
	@Override
	public Set<NivelesModulo> findByModulo(Long id) {
		return nivelesModuloRepository.findByIdModulo(id);

	}

	/**
	 * Delete3 NivelesModulo
	 */
	@Override
	public void delete(Long id) {
		nivelesModuloRepository.deleteById(id);
		
	}

}
