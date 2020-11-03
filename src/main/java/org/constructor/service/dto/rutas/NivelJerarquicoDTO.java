/**
 * 
 */
package org.constructor.service.dto.rutas;

import java.util.HashSet;
import java.util.Set;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.domain.agrupador.Agrupador;
import org.constructor.domain.rutas.NivelRuta;

/**
 * @author Edukai
 *
 */
public class NivelJerarquicoDTO {

	/**
	 * Long id
	 */
	private Long id;

	/**
	 * String nombre
	 */
	private String nombre;

	/**
	 * String imagenUrl
	 */
	private String imagenUrl;

	/**
	 * estructuraJerarquicas
	 */
	private Set<EstructuraJerarquica> estructuraJerarquica = new HashSet<>();

	/**
	 * agrupadors
	 */
	private Set<Agrupador> agrupadores;

	/**
	 * nivelRuta
	 */
	private Set<NivelRuta> nivelRuta = new HashSet<>();

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



	/**
	 * @return the estructuraJerarquica
	 */
	public Set<EstructuraJerarquica> getEstructuraJerarquica() {
		return estructuraJerarquica;
	}

	/**
	 * @param estructuraJerarquica the estructuraJerarquica to set
	 */
	public void setEstructuraJerarquica(Set<EstructuraJerarquica> estructuraJerarquica) {
		this.estructuraJerarquica = estructuraJerarquica;
	}

	/**
	 * @return the agrupadores
	 */
	public Set<Agrupador> getAgrupadores() {
		return agrupadores;
	}

	/**
	 * @param agrupadores the agrupadores to set
	 */
	public void setAgrupadores(Set<Agrupador> agrupadores) {
		this.agrupadores = agrupadores;
	}

	/**
	 * @return the nivelRuta
	 */
	public Set<NivelRuta> getNivelRuta() {
		return nivelRuta;
	}

	/**
	 * @param nivelRuta the nivelRuta to set
	 */
	public void setNivelRuta(Set<NivelRuta> nivelRuta) {
		this.nivelRuta = nivelRuta;
	}

	@Override
	public String toString() {
		return "NivelJerarquicoDTO [id=" + id + ", nombre=" + nombre + ", imagenUrl=" + imagenUrl
				+ ", estructuraJerarquica=" + estructuraJerarquica + ", agrupadores=" + agrupadores + ", nivelRuta="
				+ nivelRuta + "]";
	}

}
