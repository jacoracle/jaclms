/**
 * 
 */
package org.constructor.domain.rutas;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;


/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "niveles_ruta")
public class NivelRuta implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 3715881563932131973L;

	
	/**
	 * Long id
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * nivel_jerarquico_id
	 */
	@ManyToOne
    @JoinColumn(name = "nivel_jerarquico_id", nullable=false)
    private NivelJerarquico nivelJerarquico;

	/**
	 * rutas_id
	 */
	@ManyToOne
	@JsonIgnore
    @JoinColumn(name = "ruta_id", nullable=false)
    private RutasAprendizaje rutasAprendizaje;
	
	/**
	 * The orden.
	 */
	
	@Column(name = "orden")
	private Long orden;

	/**
	 * Get
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Get
	 * @return the nivelJerarquico
	 */
	public NivelJerarquico getNivelJerarquico() {
		return nivelJerarquico;
	}

	/**
	 * Set
	 * @param nivelJerarquico the nivelJerarquico to set
	 */
	public void setNivelJerarquico(final NivelJerarquico nivelJerarquico) {
		this.nivelJerarquico = nivelJerarquico;
	}

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
	public void setOrden(final Long orden) {
		this.orden = orden;
	}

	/**
	 * equals
	 */
	@Override
    public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof NivelRuta)) {
            return false;
        }
        NivelRuta other = (NivelRuta) obj;
        return this.id.equals(other.id);
    }
	
	/**
	 * hashCode
	 */
	@Override
	   public int hashCode() {
	        return id.hashCode();
	    }

	@Override
	public String toString() {
		return "NivelRuta [id=" + id + ", nivelJerarquico=" + nivelJerarquico + ", orden=" + orden + "]";
	}

	
	
	
}
