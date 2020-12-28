/**
 * 
 */
package org.constructor.repository.rutas;

import java.util.Optional;

import org.constructor.domain.agrupador.Agrupador;
import org.constructor.domain.rutas.NivelJerarquico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface NivelJerarquicoRepository extends JpaRepository<NivelJerarquico, Long>{
	
	

}
