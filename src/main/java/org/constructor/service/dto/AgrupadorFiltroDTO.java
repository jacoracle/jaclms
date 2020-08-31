/**
 * 
 */
package org.constructor.service.dto;

import javax.persistence.Column;

/**
 * @author Edukai
 *
 */
public class AgrupadorFiltroDTO {
	
	/**
	 * String titulo
	 */
	@Column(nullable = true)
	private String titulo;
		
	/**
	 * String descripcion
	 */
	@Column(nullable = true)
	private String descripcion;

	/**
	 * etiquetas
	 */
	@Column(nullable = true)
	private String etiqueta;

	/**
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * Set
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Get
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**Set
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	
	/**
	 * Get
	 * @return the etiquetas
	 */
	public String getEtiqueta() {
		return etiqueta;
	}

	/**
	 * Set
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiqueta(String etiqueta) {
		this.etiqueta = etiqueta;
	}

	@Override
	public String toString() {
		return "AgrupadorFiltroDTO [titulo=" + titulo + ", descripcion=" + descripcion + ", etiquetas=" + etiqueta
				+ "]";
	}

	
	
	
}
