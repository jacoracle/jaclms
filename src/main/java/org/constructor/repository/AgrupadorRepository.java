/**
 * 
 */
package org.constructor.repository;

import org.constructor.module.domain.Agrupador;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface AgrupadorRepository extends JpaRepository<Agrupador, Long> {


}
