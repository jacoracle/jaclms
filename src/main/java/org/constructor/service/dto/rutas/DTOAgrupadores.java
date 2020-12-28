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
	 * Nivel id
	 */
	private Long nivelId;

	/**
	 * Nivele Agrupador Id
	 */
	private Long nivelAgrupadorId;

	/**
	 * titulo
	 */
	String nombre;

	/**
	 * Long orden 
	 */
	@OrderBy("orden ASC")
	private Long orden;

	/**
	 * Get
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set
	 * @param id the id to set
	 */
	public void setId(final Long id) {
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
	 * Get
	 * @return the nivelAgrupadorId
	 */
	public Long getNivelAgrupadorId() {
		return nivelAgrupadorId;
	}

	/**
	 * Set
	 * @param nivelAgrupadorId the nivelAgrupadorId to set
	 */
	public void setNivelAgrupadorId(final Long nivelAgrupadorId) {
		this.nivelAgrupadorId = nivelAgrupadorId;
	}


	/**
	 * Get
	 * @return the nivelId
	 */
	public Long getNivelId() {
		return nivelId;
	}

	/**
	 * Set
	 * @param nivelId the nivelId to set
	 */
	public void setNivelId(final Long nivelId) {
		this.nivelId = nivelId;
	}

	/**
	 * Get
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Set
	 * @param nombre the nombre to set
	 */
	public void setNombre(final String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Set 
	 * @param orden the orden to set
	 */
	public void setOrden(final Long orden) {
		this.orden = orden;
	}

	/**
	 * ToString
	 */
	@Override
	public String toString() {
		return "DTOAgrupadores [id=" + id + ", nivelId=" + nivelId + ", nivelAgrupadorId=" + nivelAgrupadorId
				+ ", nombre=" + nombre + ", orden=" + orden + "]";
	}

}
