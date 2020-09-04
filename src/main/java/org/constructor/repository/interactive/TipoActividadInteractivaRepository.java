/**
 * 
 */
package org.constructor.repository.interactive;

import org.constructor.domain.interactive.TipoActividadInteractiva;
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
