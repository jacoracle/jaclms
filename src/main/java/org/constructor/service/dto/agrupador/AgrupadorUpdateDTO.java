/**
 * 
 */
package org.constructor.service.dto.agrupador;

import java.util.HashSet;
import java.util.Set;

import org.constructor.domain.agrupador.Etiqueta;

/**
 * @author Norman Erick Estrada
 *
 */
public class AgrupadorUpdateDTO {

	
	private Long id;

	private String titulo;

	/**
	 * String descripcion
	 */
	private String descripcion;

	
    private Set<Etiqueta> etiquetas = new HashSet<>();


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
	 * @return the etiquetas
	 */
	public Set<Etiqueta> getEtiquetas() {
		return etiquetas;
	}


	/**
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiquetas(Set<Etiqueta> etiquetas) {
		this.etiquetas = etiquetas;
	}
    
    
    
    
    
}
