/**
 * 
 */
package org.constructor.repository;

import java.util.Optional;
import java.util.Set;

import org.constructor.domain.Ficha;
import org.constructor.domain.NivelesCurso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the NivelesCurso entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NivelesCursoRepository extends JpaRepository<NivelesCurso, Long>  {
	
	@Query("select niveles from NivelesCurso niveles join fetch niveles.nivelModulo nj where nj.id =:id")
    Optional<NivelesCurso> findByIdNivel(@Param("id") Long id);
	
	@Query("select niveles from NivelesCurso niveles join fetch niveles.curso nc where nc.id =:id")
    Set<NivelesCurso> findByIdCurso(@Param("id") Long id);

}
