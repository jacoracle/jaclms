/**
 * 
 */
package org.constructor.repository;

import java.util.List;
import java.util.Set;

import javax.transaction.Transactional;

import org.constructor.module.domain.Modulo;
import org.constructor.service.dto.ModuloFiltroDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

public interface ModuloRepository extends JpaRepository<Modulo, Long> {
	
	@Query("SELECT m from Modulo m JOIN FETCH  m.user mo where mo.id = :id")
	List<Modulo> findAllModuloUserId (@Param("id")Long id);
	
	

	
	@Query("SELECT  mod  FROM Modulo mod  JOIN FETCH  mod.asignatura fet  JOIN FETCH  mod.numeroGrados num JOIN FETCH mod.temas te  "
			+ "WHERE mod.titulo LIKE %:titulo% "
			+ "and  mod.descripcion LIKE  %:descripcion% "
			+ "and fet.descripcion LIKE  %:asignatura% " 
			+ "and num.descripcion LIKE  %:numeroGrados% and te.nombre LIKE %:temas% ") 
	Set< Modulo> findModuloByTituloByDescripcionByNumeroGrados(
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion, 
			 @Param("asignatura") String asignatura,
			 @Param("numeroGrados") String numeroGrados,
			 @Param("temas") String temas);

	@Query("SELECT mo From Modulo mo  WHERE mo.titulo LIKE %:titulo% and  mo.descripcion LIKE  %:descripcion% ")
	Set< Modulo> findModuloByTituloByDescripcion (
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion);

}
