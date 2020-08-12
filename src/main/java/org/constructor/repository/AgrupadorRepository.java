/**
 * 
 */
package org.constructor.repository;

import java.util.List;

import org.constructor.module.domain.Agrupador;
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
public interface AgrupadorRepository extends JpaRepository<Agrupador, Long> {


	@Query("SELECT a from Agrupador a JOIN FETCH  a.user ag where ag.id = :id")
	List<Agrupador> findAllAgrupadorUserId (@Param("id")Long id);
	
    Page<Agrupador> findFirst10AgrupadorByOrderByIdDesc(Pageable pageable);


}
