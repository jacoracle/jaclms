/**
 * 
 */
package org.constructor.service.dto;

import javax.persistence.Column;



/**
 * @author Edukai
 *
 */
public class ModuloFiltroDTO {
	
	
	
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
	 * String areaDeConocimiento
	 */
	@Column(nullable = true)
	private String asignatura;
	
	
	/**
	 * String nivelAcademico
	 */
	@Column(nullable = true)
	private String numeroGrados;
	
	/**
	 * Temas
	 */
	@Column(nullable = true)
	private String temas;

	
	/**
	 * @return the titulo
	 */
	
	public String getTitulo() {
		return titulo;
	}

	/**
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * @return the asignatura
	 */
	public String getAsignatura() {
		return asignatura;
	}

	/**
	 * @param asignatura the asignatura to set
	 */
	public void setAsignatura(String asignatura) {
		this.asignatura = asignatura;
	}

	/**
	 * @return the numeroGrados
	 */
	public String getNumeroGrados() {
		return numeroGrados;
	}

	/**
	 * @param numeroGrados the numeroGrados to set
	 */
	public void setNumeroGrados(String numeroGrados) {
		this.numeroGrados = numeroGrados;
	}

	/**
	 * @return the temas
	 */
	public String getTemas() {
		return temas;
	}

	/**
	 * @param temas the temas to set
	 */
	public void setTemas(String temas) {
		this.temas = temas;
	}

	@Override
	public String toString() {
		return "ModuloFiltroDTO [titulo=" + titulo + ", descripcion=" + descripcion + ", asignatura=" + asignatura
				+ ", numeroGrados=" + numeroGrados + ", temas=" + temas + "]";
	}




	
}
