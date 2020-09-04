package org.constructor.repository.agrupador;

import org.constructor.domain.agrupador.AgrupadorModulo;
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
