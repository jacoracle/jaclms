/**
 * 
 */
package org.constructor.repository.rutas;

import java.util.List;

import org.constructor.domain.module.Modulo;
import org.constructor.domain.rutas.RutasAprendizaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface RutasAprendizajeRepository extends JpaRepository<RutasAprendizaje, Long>{

	@Query("SELECT r from RutasAprendizaje r JOIN FETCH  r.user ru where ru.id = :id")
	List<RutasAprendizaje> findAllRutaUserId (@Param("id")Long id);
}
