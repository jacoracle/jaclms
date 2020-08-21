package org.constructor.repository;

import org.constructor.module.domain.AgrupadorModulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface AgrupadorModuloRepository extends JpaRepository<AgrupadorModulo, Long> {


}
