/**
 * 
 */
package org.constructor.service.dto;

import org.constructor.domain.rutas.NivelJerarquico;

/**
 * @author Edukai
 *
 */
public class NivelJerarquicoDTO {
	
	/**
	 * nivelJerarquico
	 */
	private NivelJerarquico nivelJerarquico;

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

	@Override
	public String toString() {
		return "NivelJerarquicoDTO [nivelJerarquico=" + nivelJerarquico + "]";
	}

	
	
}
