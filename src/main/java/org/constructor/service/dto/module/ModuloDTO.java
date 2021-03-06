/**
 * 
 */
package org.constructor.service.dto.module;

import org.constructor.domain.module.Modulo;

/**
 * @author Edukai
 *
 */
public class ModuloDTO {
	

	/**
	 *  modulo;
	 */
	private Modulo modulo;

	/**
	 * @return the modulo
	 */
	public Modulo getModulo() {
		return modulo;
	}

	/**
	 * @param modulo the modulo to set
	 */
	public void setModulo(Modulo modulo) {
		this.modulo = modulo;
	}

	@Override
	public String toString() {
		return "ModuloDTO [modulo=" + modulo + "]";
	}
}
