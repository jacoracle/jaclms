/**
 * 
 */
package org.constructor.repository.rutas;

import java.util.Optional;

import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.domain.rutas.NivelRuta;
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
public interface NivelRutaRepository extends JpaRepository<NivelRuta, Long>{
	
	 @Query("SELECT ruta FROM NivelRuta ruta  where ruta.nivelJerarquico = :nivelJerarquico  ")
	   Optional<NivelRuta> findByRutas(@Param("nivelJerarquico")NivelJerarquico nivelJerarquico );

}
