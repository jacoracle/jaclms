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
public class DTORutaAprendizaje {

	/**
	 * id
	 */
	private Long id;
	
	/**
	 * descripcion
	 */
	
	private String titulo;
	
	/**
	 * Portada URL
	 */
	private String portadaUrl;

	/**
	 * niveles
	 */
	private List<DTONivelJerarquico> niveles = new ArrayList<>() ;

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
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * Set
	 * @param titulo the titulo to set
	 */
	public void setTitulo(final String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Get
	 * @return the niveles
	 */
	public List<DTONivelJerarquico> getNiveles() {
		return niveles;
	}

	/**
	 * Set
	 * @param niveles the niveles to set
	 */
	public void setNiveles(List<DTONivelJerarquico> niveles) {
		this.niveles = niveles;
	}

	/**
	 * Get
	 * @return the portadaUrl
	 */
	public String getPortadaUrl() {
		return portadaUrl;
	}

	/**
	 * Set
	 * @param portadaUrl the portadaUrl to set
	 */
	public void setPortadaUrl(final String portadaUrl) {
		this.portadaUrl = portadaUrl;
	}

	@Override
	public String toString() {
		return "DTORutaAprendizaje [id=" + id + ", titulo=" + titulo + ", niveles=" + niveles + "]";
	}
	
	
	
}
