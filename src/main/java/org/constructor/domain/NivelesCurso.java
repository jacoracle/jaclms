/**
 * 
 */
package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A NivelesCurso.
 */
@Entity
@Table(name = "niveles_curso")
public class NivelesCurso  implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 71868642442656749L;

	/**
	 * Long Id 
	 */
	@JsonIgnore
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * Curso_id
	 */
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "curso_id", nullable=false)
    private Curso curso;
	
	/**
	 * nivel_jerarquico_id
	 */
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "nivel_modulo_id", nullable=false)
    private NivelJerarquico nivelJerarquico;
	
	/**
	 * orden_nivel
	 */
	@Column(name = "orden")
	@OrderBy
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
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the curso
	 */
	public Curso getCurso() {
		return curso;
	}

	/**
	 * @param curso the curso to set
	 */
	public void setCurso(Curso curso) {
		this.curso = curso;
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
	public void setNivelJerarquico(NivelJerarquico nivelJerarquico) {
		this.nivelJerarquico = nivelJerarquico;
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
	 * @param ordenNivel the ordenNivel to set
	 */
	public void setOrdenNivel(int ordenNivel) {
		this.ordenNivel = ordenNivel;
	}
	
	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "NivelesCurso [id=" + id + ", id_nivel_jerarquico="
				+ nivelJerarquico + ", ordenNivel=" + ordenNivel + "]";
	}
	
	
}
