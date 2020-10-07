/**
 * 
 */
package org.constructor.service.impl.rutas;

import java.util.Optional;

import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.repository.rutas.NivelJerarquicoRepository;
import org.constructor.service.rutas.NivelJerarquicoService;
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
public class NivelJerarquicoServiceImpl implements NivelJerarquicoService{
	
	

	
	/**
	 * NivelJerarquicoRepository
	 */
	private final NivelJerarquicoRepository nivelJerarquicoRepository;
	
	/**
	 * NivelJerarquicoServiceImpl.
	 *
	 * @param nivelJerarquicoRepository the nivel jerarquico repository
	 */
	public NivelJerarquicoServiceImpl(NivelJerarquicoRepository nivelJerarquicoRepository) {
        this.nivelJerarquicoRepository = nivelJerarquicoRepository;
    }

	/**
	 * Save  NivelJerarquico
	 */
	@Override
	public NivelJerarquico save(NivelJerarquico nivelJerarquico) {
		return nivelJerarquicoRepository.save(nivelJerarquico);
	}

	/**
	 * finAll NivelJerarquico
	 */
	@Override
	public Page<NivelJerarquico> findAll(Pageable pageable) {
		return nivelJerarquicoRepository.findAll(pageable) ;

	}

	/**
	 * finOne NivelJerarquico
	 */
	@Override
	public Optional<NivelJerarquico> findOne(Long id) {
		return nivelJerarquicoRepository.findById(id);
	}

	/**
	 * Delete NivelJerarquico
	 */
	@Override
	public void delete(Long id) {
		nivelJerarquicoRepository.deleteById(id);
		
	}


}
