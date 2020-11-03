package org.constructor.response;

import org.constructor.domain.rutas.NivelJerarquico;
import org.constructor.domain.rutas.RutasAprendizaje;

public class OrdenamientoResponse {
	
	private Long orden;
	
	private NivelJerarquico nivelJerarquico ;
	
	private RutasAprendizaje ruta;


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
	 * @return the nivelJerarquico
	 */
	public NivelJerarquico getNivelJerarquico() {
		return nivelJerarquico;
	}

	/**
	 * @param nivelJerarquico the nivelJerarquico to set
	 */
	public void setNivelJerarquico(NivelJerarquico nivelJerarquico) {
		this.nivelJerarquico = nivelJerarquico;
	}

	/**
	 * @return the ruta
	 */
	public RutasAprendizaje getRuta() {
		return ruta;
	}

	/**
	 * @param ruta the ruta to set
	 */
	public void setRuta(RutasAprendizaje ruta) {
		this.ruta = ruta;
	}

	@Override
	public String toString() {
		return "OrdenamientoResponse [orden=" + orden + ", nivelJerarquico=" + nivelJerarquico + ", ruta=" + ruta + "]";
	}
	
}
