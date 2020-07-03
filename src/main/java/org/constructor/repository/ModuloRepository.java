/**
 * 
 */
package org.constructor.repository;

import org.constructor.domain.Modulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface ModuloRepository extends JpaRepository<Modulo, Long> {

}
