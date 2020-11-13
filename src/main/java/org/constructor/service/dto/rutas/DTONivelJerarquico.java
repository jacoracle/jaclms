/**
 * 
 */
package org.constructor.service.dto.rutas;

import java.util.ArrayList;
import java.util.List;



/**
 * @author Edukai
 *
 */
public class DTONivelJerarquico {
	
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
	 * orden
	 */
	private Long orden; 
	
	/**
	 * niveles
	 */
	private List<EstructuraJerarquicaDTO> niveles = new ArrayList<>();

	/**
	 * agrupadores
	 */
	private List<DTOAgrupadores> agrupadores = new ArrayList<>();

	/**
	 * @return the idNivel
	 */
	public Long getId() {
		return id;
	}


	/**
	 * @param idNivel the idNivel to set
	 */
	public void setId(Long id) {
		this.id = id;
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
	 * @return the niveles
	 */
	public List<EstructuraJerarquicaDTO> getNiveles() {
		return niveles;
	}


	/**
	 * @param niveles the niveles to set
	 */
	public void setNiveles(List<EstructuraJerarquicaDTO> niveles) {
		this.niveles = niveles;
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
		return "DTONivelJerarquico [id=" + id + ", nombre=" + nombre + ", imagenUrl=" + imagenUrl + ", orden=" + orden
				+ ", niveles=" + niveles + ", agrupadores=" + agrupadores + "]";
	}

	
	
}
