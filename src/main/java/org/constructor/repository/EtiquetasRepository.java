/**
 * 
 */
package org.constructor.repository;

import org.constructor.module.domain.Etiqueta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * @author Edukai
 *
 */
@SuppressWarnings("unused")
@Repository
public interface EtiquetasRepository extends JpaRepository<Etiqueta, Long>{

}
