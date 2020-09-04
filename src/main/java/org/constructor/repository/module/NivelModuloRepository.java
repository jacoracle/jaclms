package org.constructor.repository.module;

import org.constructor.domain.RolesColaboradores;
import org.constructor.domain.module.NivelModulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NivelModulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelModuloRepository extends JpaRepository<NivelModulo, Long> {

}
