/**
 * 
 */
package org.constructor.repository;


import org.constructor.domain.TiposBloquesComponentes;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface TiposBloquesComponentesRepository  extends JpaRepository<TiposBloquesComponentes, Long> {

}
