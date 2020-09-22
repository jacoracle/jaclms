/**
 * 
 */
package org.constructor.repository.agrupador;

import java.util.List;
import java.util.Set;

import org.constructor.domain.agrupador.Agrupador;
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
public interface AgrupadorRepository extends JpaRepository<Agrupador, Long> {


	@Query("SELECT a from Agrupador a JOIN FETCH  a.user ag where ag.id = :id")
	List<Agrupador> findAllAgrupadorUserId (@Param("id")Long id);
	
	
	
  

	@Query("SELECT a from Agrupador a JOIN FETCH  a.user ag where ag.id = :id")
	List<Agrupador> findFirst20AgrupadorByOrderByIdDesc(@Param("id")Long id);

    
	
	@Query("SELECT  agru  FROM Agrupador agru JOIN FETCH agru.user usr Join fetch agru.etiquetas eti    "
			+ "WHERE usr.id = :id and "
			+ "agru.titulo LIKE %:titulo% "
			+ "and  agru.descripcion LIKE  %:descripcion% "
			+ "and  eti.descripcion LIKE  %:etiqueta%")
	Set<Agrupador> findAgrupadorByTituloByDescripcionByEtiqueta(
			 @Param("id")Long id,
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion, 
			 @Param("etiqueta") String etiqueta); 


	@Query("SELECT  agru  FROM Agrupador agru JOIN FETCH agru.user  use  "
			+ "WHERE use.id = :id and  agru.titulo LIKE %:titulo% "
			+ "and  agru.descripcion LIKE  %:descripcion% ")
	Set<Agrupador> findAgrupadorByTituloByDescripcion(
			 @Param("id")Long id,
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion );
	
	@Query("SELECT  agru  FROM Agrupador agru Join fetch agru.etiquetas eti    "
			+ "WHERE agru.titulo LIKE %:titulo% "
			+ "and  agru.descripcion LIKE  %:descripcion% "
			+ "and  eti.descripcion LIKE  %:etiqueta%")
	Set<Agrupador> findAgrupadorAdmin(
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion, 
			 @Param("etiqueta") String etiqueta); 


	@Query("SELECT  agru  FROM Agrupador agru     "
			+ "WHERE agru.titulo LIKE %:titulo% "
			+ "and  agru.descripcion LIKE  %:descripcion% ")
	Set<Agrupador> findAgrupadorByTituloByDescripcionAdmin(
			 @Param("titulo") String titulo,
			 @Param("descripcion") String descripcion );



}
