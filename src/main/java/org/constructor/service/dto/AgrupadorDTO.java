/**
 * 
 */
package org.constructor.service.dto;

import org.constructor.module.domain.Agrupador;

/**
 * @author Edukai
 *
 */
public class AgrupadorDTO {

	
	/**
	 * agrupador
	 */
	private Agrupador agrupador;

	/**
	 * @return the agrupador
	 */
	public Agrupador getAgrupador() {
		return agrupador;
	}

	/**
	 * @param agrupador the agrupador to set
	 */
	public void setAgrupador(Agrupador agrupador) {
		this.agrupador = agrupador;
	}

	@Override
	public String toString() {
		return "AgrupadorDTO [agrupador=" + agrupador + "]";
	}
	
	
}
