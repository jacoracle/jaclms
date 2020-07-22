/**
 * 
 */
package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */

@Entity
@Table(name = "tipos_bloques_componentes")
public class TiposBloquesComponentes implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -6802265530872044091L;
	
	
	
	/**
	 * Long id
	 */
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonIgnore
    private Long id;
	
	/** 
	 * The orden. 
	 */
	@Column(name = "orden")
    private Long orden;
    
	@ManyToOne
    private TipoComponente tipoComponente;

	/** The tipos componentes. */
	@ManyToOne
	@JsonIgnore
	private TipoBloqueComponentes tipoBloqueComponentes;
	



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
	 * Get
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}


	/**
	 * Set
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}


	/**
	 * @return the tipoComponente
	 */
	public TipoComponente getTipoComponente() {
		return tipoComponente;
	}


	/**
	 * @param tipoComponente the tipoComponente to set
	 */
	public void setTipoComponente(TipoComponente tipoComponente) {
		this.tipoComponente = tipoComponente;
	}


	/**
	 * @return the tipoBloqueComponentes
	 */
	
	public TipoBloqueComponentes getTipoBloqueComponentes() {
		return tipoBloqueComponentes;
	}


	/**
	 * @param tipoBloqueComponentes the tipoBloqueComponentes to set
	 */
	public void setTipoBloqueComponentes(TipoBloqueComponentes tipoBloqueComponentes) {
		this.tipoBloqueComponentes = tipoBloqueComponentes;
	}




	




	
	

	
	
	

}
