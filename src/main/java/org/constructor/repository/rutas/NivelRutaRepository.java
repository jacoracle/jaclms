/**
 * 
 */
package org.constructor.repository.rutas;

import org.constructor.domain.rutas.NivelRuta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface NivelRutaRepository extends JpaRepository<NivelRuta, Long>{

}
