/**
 * 
 */
package org.constructor.service.dto;



/**
 * @author Edukai
 *
 */
public class UpdateAgrupadorDTO {
	
	/**
	 * Id
	 */
	private Long id;
	
	/**
	 * Orden
	 */
	private Long orden;
	
	
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

	@Override
	public String toString() {
		return "UpdateAgrupadorDTO [id=" + id + ", orden=" + orden + "]";
	}


}
