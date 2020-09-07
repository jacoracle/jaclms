/**
 * 
 */
package org.constructor.domain.agrupador;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.constructor.domain.module.Modulo;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonBackReference;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "agrupador_modulo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class AgrupadorModulo implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 8842725359899046339L;

	/**
	 * Long id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * The orden.
	 */
	@Column(name = "orden")
	private Long orden;
	
	
	/**
	 * modulo_id
	 */
	
	@ManyToOne
    @JoinColumn(name = "modulo_id", nullable=false)
    private Modulo modulo;
	
	
	

	/**
	 * agrupador_id
	 */
	
	@ManyToOne
    @JoinColumn(name = "agrupador_id", nullable=false)
    @JsonBackReference
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


	public Agrupador getAgrupador() {
		return agrupador;
	}


	public void setAgrupador(Agrupador agrupador) {
		this.agrupador = agrupador;
	}


	/**
	 * equals
	 */
	@Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof AgrupadorModulo)) {
            return false;
        }
        AgrupadorModulo other = (AgrupadorModulo) obj;
        return this.id.equals(other.id);
    }
	
	/**
	 * hashCode
	 */
	@Override
	   public int hashCode() {
	        return id.hashCode();
	    }
	
	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "AgrupadorModulo [id=" + id + ", orden=" + orden + ", modulo=" + modulo + ", agrupador=" + agrupador
				+ "]";
	} 
	
	
	

}
