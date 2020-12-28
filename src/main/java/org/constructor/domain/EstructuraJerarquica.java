package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.constructor.domain.rutas.NivelJerarquico;


/**
 * A EstructuraJerarquica.
 */
@Entity
@Table(name = "estructura_jerarquica")
public class EstructuraJerarquica implements Serializable{
	
	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Long id 
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * int nivel_jerarquico_id
	 */
	@Column(name = "nivel_jerarquico_id", nullable=false)
	private Long nivel;
	
	/**
	 * int subNivelJerarquico
	 */
	@ManyToOne
	@JoinColumn(name = "subnivel_jerarquico_id", nullable=false)
	private NivelJerarquico subNivelJerarquico;
	
	/**
	 * int ordenNivel
	 */
	@OrderBy ("orden ASC")
	@Column(name = "orden")
    private Long ordenNivel;


	
	/**
	 * Get 
	 * @return the id 
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set
	 * @param id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the subNivelJerarquico
	 */
	public NivelJerarquico getSubNivelJerarquico() {
		return subNivelJerarquico;
	}

	/**
	 * @param subNivelJerarquico the subNivelJerarquico to set
	 */
	public void setSubNivelJerarquico(NivelJerarquico subNivelJerarquico) {
		this.subNivelJerarquico = subNivelJerarquico;
	}



	/**
	 * @return the nivel
	 */
	public Long getNivel() {
		return nivel;
	}

	/**
	 * @param nivel the nivel to set
	 */
	public void setNivel(Long nivel) {
		this.nivel = nivel;
	}

	/**
	 * @return the ordenNivel
	 */
	public Long getOrdenNivel() {
		return ordenNivel;
	}

	/**
	 * @param ordenNivel the ordenNivel to set
	 */
	public void setOrdenNivel(Long ordenNivel) {
		this.ordenNivel = ordenNivel;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "EstructuraJerarquica [id=" + id  + "]";
	}
	
}
