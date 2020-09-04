/**
 * 
 */
package org.constructor.service.dto.agrupador;



import org.constructor.domain.agrupador.Agrupador;
import org.constructor.domain.module.Modulo;


/**
 * @author Edukai
 *
 */
public class AgrupadorModuloDTO {

	
	/**
	 * Long id
	 */

	private Long id;

	/**
	 * The orden.
	 */
	private Long orden;
	
	
	/**
	 * modulo
	 */
	
    private Modulo modulo;
	
	/**
	 * agrupador
	 */
	
    private Agrupador agrupador;

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
    
    
    
    
}
