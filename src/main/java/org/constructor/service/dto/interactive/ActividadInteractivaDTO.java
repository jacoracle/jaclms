/**
 * 
 */
package org.constructor.service.dto.interactive;

import org.constructor.domain.interactive.TipoActividadInteractiva;

/**
 * @author Edukai
 *
 */
public class ActividadInteractivaDTO {

	
	/**
	 * Long Id
	 */

	private Long id;
	
	/** The nombre. */
	private String nombre;

	/**
	 * Json contenido
	 */
	private Object contenido;
	
	/**
	 * Boolean evaluable
	 */
	private Boolean evaluable;
	
	/**
	 * Long intentos
	 */
	private Long intentos;
	
	/**
	 * Long gamificacion
	 */
	private Long gamificacion;
	
	private TipoActividadInteractiva tipoActividadInteractiva ;  

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
	 * @return the contenido
	 */
	public Object getContenido() {
		return contenido;
	}

	/**
	 * @param contenido the contenido to set
	 */
	public void setContenido(Object contenido) {
		this.contenido = contenido;
	}

	/**
	 * @return the evaluable
	 */
	public Boolean getEvaluable() {
		return evaluable;
	}

	/**
	 * @param evaluable the evaluable to set
	 */
	public void setEvaluable(Boolean evaluable) {
		this.evaluable = evaluable;
	}

	/**
	 * @return the intentos
	 */
	public Long getIntentos() {
		return intentos;
	}

	/**
	 * @param intentos the intentos to set
	 */
	public void setIntentos(Long intentos) {
		this.intentos = intentos;
	}

	/**
	 * @return the gamificacion
	 */
	public Long getGamificacion() {
		return gamificacion;
	}

	/**
	 * @param gamificacion the gamificacion to set
	 */
	public void setGamificacion(Long gamificacion) {
		this.gamificacion = gamificacion;
	}
	
	

	/**
	 * @return the tipoActividadInteractiva
	 */
	public TipoActividadInteractiva getTipoActividadInteractiva() {
		return tipoActividadInteractiva;
	}

	/**
	 * @param tipoActividadInteractiva the tipoActividadInteractiva to set
	 */
	public void setTipoActividadInteractiva(TipoActividadInteractiva tipoActividadInteractiva) {
		this.tipoActividadInteractiva = tipoActividadInteractiva;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "ActividadInteractivaDTO [id=" + id + ", nombre=" + nombre + ", contenido=" + contenido + ", evaluable="
				+ evaluable + ", intentos=" + intentos + ", gamificacion=" + gamificacion
				+ ", tipoActividadInteractiva=" + tipoActividadInteractiva + "]";
	}
	
	
}
