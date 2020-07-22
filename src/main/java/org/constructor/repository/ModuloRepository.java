/**
 * 
 */
package org.constructor.repository;

import java.util.List;

import org.constructor.module.domain.Modulo;
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
	
	

}
