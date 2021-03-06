package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.constructor.domain.module.NivelModulo;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	@JsonIgnore
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * NivelModulo nivelModulo
	 */
    private NivelModulo nivelModulo;
	
	/**
	 * int subNivelJerarquico
	 */
	@Column(name = "subnivel_jerarquico_id", nullable=false)
	private int subNivelJerarquico;
	
	/**
	 * int ordenNivel
	 */
	@Column(name = "orden")
    private int ordenNivel;

	
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
	 * Get 
	 * @return the nivelModulo 
	 */
	public NivelModulo getNivelJerarquico() {
		return nivelModulo;
	}

	/**
	 * Set
	 * @param nivelModulo
	 */
	public void setNivelJerarquico(NivelModulo nivelModulo) {
		this.nivelModulo = nivelModulo;
	}

	/**
	 * Get 
	 * @return the subNivelJerarquico
	 */
	public int getSubNivelJerarquico() {
		return subNivelJerarquico;
	}

	/**
	 * Set
	 * @param subNivelJerarquico
	 */
	public void setSubNivelJerarquico(int subNivelJerarquico) {
		this.subNivelJerarquico = subNivelJerarquico;
	}

	/**
	 * Get 
	 * @return the ordenNivel
	 */
	public int getOrdenNivel() {
		return ordenNivel;
	}

	/**
	 * Set
	 * @param ordenNivel
	 */
	public void setOrdenNivel(int ordenNivel) {
		this.ordenNivel = ordenNivel;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "EstructuraJerarquica [id=" + id + ", subNivelJerarquico="
				+ subNivelJerarquico + ", ordenNivel=" + ordenNivel + "]";
	}
	
}
