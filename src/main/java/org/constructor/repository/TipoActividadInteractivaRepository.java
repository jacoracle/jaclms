/**
 * 
 */
package org.constructor.repository;

import org.constructor.interactive.domain.TipoActividadInteractiva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface TipoActividadInteractivaRepository extends JpaRepository<TipoActividadInteractiva, Long>{

}
