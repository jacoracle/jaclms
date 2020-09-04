/**
 * 
 */
package org.constructor.repository.module;

import java.util.Optional;
import java.util.Set;

import org.constructor.domain.module.NivelesModulo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @authorEdukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface NivelesModuloRepository extends JpaRepository<NivelesModulo, Long>{

	@Query("select niveles from NivelesModulo niveles join fetch niveles.nivelModulo njm where njm.id =:id")
    Optional<NivelesModulo> findByIdNivel(@Param("id") Long id);
	
	@Query("select niveles from NivelesModulo niveles join fetch niveles.modulo nm where nm.id =:id")
    Set<NivelesModulo> findByIdModulo(@Param("id") Long id);

}
