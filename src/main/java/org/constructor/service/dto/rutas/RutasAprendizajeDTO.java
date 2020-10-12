/**
 * 
 */
package org.constructor.service.dto.rutas;

import org.constructor.domain.rutas.RutasAprendizaje;

/**
 * @author Edukai
 *
 */
public class RutasAprendizajeDTO {

	/**
	 * Rutas
	 */
	private RutasAprendizaje rutasAprendizaje;

	/**
	 * Get
	 * @return the rutasAprendizaje
	 */
	public RutasAprendizaje getRutasAprendizaje() {
		return rutasAprendizaje;
	}

	/**
	 * Set
	 * @param rutasAprendizaje the rutasAprendizaje to set
	 */
	public void setRutasAprendizaje(final RutasAprendizaje rutasAprendizaje) {
		this.rutasAprendizaje = rutasAprendizaje;
	}

	@Override
	public String toString() {
		return "RutasAprendizajeDTO [rutasAprendizaje=" + rutasAprendizaje + "]";
	}
	
	
	
}
