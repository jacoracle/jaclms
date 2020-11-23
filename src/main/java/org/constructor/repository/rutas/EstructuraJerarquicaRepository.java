package org.constructor.repository.rutas;

import java.util.Optional;
import java.util.Set;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.domain.User;
import org.constructor.domain.rutas.NivelJerarquico;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the EstructuraJerarquica entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EstructuraJerarquicaRepository extends JpaRepository<EstructuraJerarquica, Long>{
	
	
	 @Query("SELECT est FROM EstructuraJerarquica est where est.nivel = :id")
	    Set<EstructuraJerarquica> findByEstructura(@Param("id")Long id);
	 
	 @Query("SELECT est FROM EstructuraJerarquica est  where est.subNivelJerarquico = :subNivelJerarquico")
	   Optional<EstructuraJerarquica> findBySubNivel(@Param("subNivelJerarquico")NivelJerarquico subNivelJerarquico);
	 
	 @Query("SELECT est FROM EstructuraJerarquica est where est.nivel = :id")
	    Set<EstructuraJerarquica> findByNivel(@Param("id")Long id);

}
