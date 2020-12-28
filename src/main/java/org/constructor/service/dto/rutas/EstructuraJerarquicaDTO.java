/**
 * 
 */
package org.constructor.service.dto.rutas;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;


/**
 * @author Edukai
 *
 */
public class EstructuraJerarquicaDTO {

	
	/**
	 * id
	 */
	 private Long id;
	 	 
	 /**
	  * nombre
	  */
	 private String nombre;
	 
	 /**
	  * imagenUrl
	  */
	 private String imagenUrl ;
	 
	 /**
	  * subNivelJerarquico
	  */
	 private Set<EstructuraJerarquicaDTO>  niveles = new HashSet<>();
	 
	/**
	 * agrupadores
	 */
	 private List<DTOAgrupadores> agrupadores = new ArrayList<>();
	 
	 /**
	  * ordenNivel
	  */
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
	 * @return the niveles
	 */
	public Set<EstructuraJerarquicaDTO> getNiveles() {
		return niveles;
	}

	/**
	 * @param niveles the niveles to set
	 */
	public void setNiveles(Set<EstructuraJerarquicaDTO> niveles) {
		this.niveles = niveles;
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

	/**
	 * @return the agrupadores
	 */
	public List<DTOAgrupadores> getAgrupadores() {
		return agrupadores;
	}

	/**
	 * @param agrupadores the agrupadores to set
	 */
	public void setAgrupadores(List<DTOAgrupadores> agrupadores) {
		this.agrupadores = agrupadores;
	}

	
	/**
	 * @return the imagenUrl
	 */
	public String getImagenUrl() {
		return imagenUrl;
	}

	/**
	 * @param imagenUrl the imagenUrl to set
	 */
	public void setImagenUrl(String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}

	@Override
	public String toString() {
		return "EstructuraJerarquicaDTO [id=" + id + ", nombre=" + nombre + ", imagenUrl=" + imagenUrl + ", niveles="
				+ niveles + ", agrupadores=" + agrupadores + ", orden=" + orden + "]";
	}

	
	 
	 
}
