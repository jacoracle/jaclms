/**
 * 
 */
package org.constructor.repository;

import org.constructor.module.domain.Temas;
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
