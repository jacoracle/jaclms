/**
 * 
 */
package org.constructor.repository;

import org.constructor.interactive.domain.ActividadInteractiva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface ActividadInteractivaRepository extends JpaRepository<ActividadInteractiva, Long>{

}
