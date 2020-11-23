/**
 * 
 */
package org.constructor.repository.rutas;

import org.constructor.domain.rutas.NivelesAgrupador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface NivelesAgrupadorRepository  extends  JpaRepository<NivelesAgrupador, Long>{

}
