/**
 * 
 */
package org.constructor.repository.module;

import org.constructor.domain.module.Temas;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface TemasRepository  extends JpaRepository<Temas, Long>{

}
