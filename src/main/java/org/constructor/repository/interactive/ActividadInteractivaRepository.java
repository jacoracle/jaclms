/**
 * 
 */
package org.constructor.repository.interactive;

import org.constructor.domain.interactive.ActividadInteractiva;
import org.constructor.domain.interactive.TipoActividadInteractiva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.query.Param;


/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface ActividadInteractivaRepository extends JpaRepository<ActividadInteractiva, Long>{

	

@Query("SELECT tip FROM TipoActividadInteractiva tip,ActividadInteractiva act  WHERE  tip.tipoActividad  = :tipoActividad and tip.subtipo = :subtipo and tip.opcion = :opcion")
	TipoActividadInteractiva getTipoActividadId(@Param("tipoActividad")String tipoActividad ,@Param("subtipo")String subtipo,@Param("opcion")String opcion);

}
