/**
 * 
 */
package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

/**
 * @author Edukai
 *
 */

@Entity
@Table(name = "tipos_bloques_componentes")
public class TiposBloquesComponentes implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -6802265530872044091L;
	
	/**
	 * EmployeeId
	 */
	@EmbeddedId
	private TiposBloquesComponentesId id;
	
	
	/** 
	 * The orden. 
	 */
	@Column(name = "orden")
    private Long orden;


	/**
	 * Get
	 * @return the id
	 */
	public TiposBloquesComponentesId getId() {
		return id;
	}


	/**
	 * Set
	 * @param id the id to set
	 */
	public void setId(TiposBloquesComponentesId id) {
		this.id = id;
	}


	/**
	 * Get
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}


	/**
	 * Set
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}

	
	

	
	
	

}
