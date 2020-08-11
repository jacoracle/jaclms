package org.constructor.repository;

import org.constructor.domain.NivelModulo;
import org.constructor.domain.RolesColaboradores;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the NivelModulo entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelModuloRepository extends JpaRepository<NivelModulo, Long> {

}
