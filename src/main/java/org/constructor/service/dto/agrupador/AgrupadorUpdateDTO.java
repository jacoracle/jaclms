/**
 * 
 */
package org.constructor.service.dto.agrupador;

import java.util.HashSet;
import java.util.Set;

import org.constructor.domain.agrupador.Etiqueta;

// TODO: Auto-generated Javadoc
/**
 * The Class AgrupadorUpdateDTO.
 *
 * @author Norman Erick Estrada
 */
public class AgrupadorUpdateDTO {

	
	/** The id. */
	private Long id;

	/** The titulo. */
	private String titulo;

	/** String descripcion. */
	private String descripcion;
	
	/** The duracion. */
	private int duracion;

    /** The etiquetas. */
    private Set<Etiqueta> etiquetas = new HashSet<>();


	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}


	/**
	 * Sets the id.
	 *
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}


	/**
	 * Gets the titulo.
	 *
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}


	/**
	 * Sets the titulo.
	 *
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}


	/**
	 * Gets the descripcion.
	 *
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}


	/**
	 * Sets the descripcion.
	 *
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	/**
	 * Gets the duracion.
	 *
	 * @return the duracion
	 */
	public int getDuracion() {
		return duracion;
	}


	/**
	 * Sets the duracion.
	 *
	 * @param duracion the new duracion
	 */
	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}


	/**
	 * Gets the etiquetas.
	 *
	 * @return the etiquetas
	 */
	public Set<Etiqueta> getEtiquetas() {
		return etiquetas;
	}


	/**
	 * Sets the etiquetas.
	 *
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiquetas(Set<Etiqueta> etiquetas) {
		this.etiquetas = etiquetas;
	}


	@Override
	public String toString() {
		return "AgrupadorUpdateDTO [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", duracion="
				+ duracion + ", etiquetas=" + etiquetas + "]";
	}
    
    
}
