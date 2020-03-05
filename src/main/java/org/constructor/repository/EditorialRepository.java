package org.constructor.repository;

import org.constructor.domain.Editorial;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Editorial entity.
 */
@SuppressWarnings("unused")
@Repository
public interface EditorialRepository extends JpaRepository<Editorial, Long> {

}
