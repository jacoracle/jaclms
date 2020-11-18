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
	 * Nivele Agrupador Id
	 */
	private Long nivelAgrupadorId;
	/**
	 * titulo
	 */
	String nombre;
	
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
	 * @return the nivelAgrupadorId
	 */
	public Long getNivelAgrupadorId() {
		return nivelAgrupadorId;
	}

	/**
	 * @param nivelAgrupadorId the nivelAgrupadorId to set
	 */
	public void setNivelAgrupadorId(Long nivelAgrupadorId) {
		this.nivelAgrupadorId = nivelAgrupadorId;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}

	@Override
	public String toString() {
		return "DTOAgrupadores [id=" + id + ", nivelAgrupadorId=" + nivelAgrupadorId + ", nombre=" + nombre + ", orden="
				+ orden + "]";
	}
	
	
	
	
	
}
