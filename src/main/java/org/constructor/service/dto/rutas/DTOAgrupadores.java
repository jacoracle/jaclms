/**
 * 
 */
package org.constructor.service.dto.rutas;

import javax.persistence.OrderBy;

/**
 * @author Edukai
 *
 */
public class DTOAgrupadores {

	
	/**
	 * Id
	 */
	private Long id;
	
	/**
	 * Long
	 */
	@OrderBy ("orden ASC")
	private Long orden;

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}

	/**
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}

	@Override
	public String toString() {
		return "DTOAgrupador [id=" + id + ", orden=" + orden + "]";
	}
	
	
	
	
	
}
