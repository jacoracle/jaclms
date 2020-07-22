/**
 * 
 */
package org.constructor.repository;

import org.constructor.module.domain.TipoModulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface TipoModuloRepository extends JpaRepository<TipoModulo, Long> {

}
