/**
 * 
 */
package org.constructor.module.domain;

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

import org.constructor.domain.NivelJerarquico;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "niveles_modulo")
public class NivelesModulo  implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 1074572879572983190L;

	/**
	 * Long Id 
	 */
	@JsonIgnore
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * modulo_id
	 */
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "modulo_id", nullable=false)
    private Modulo modulo;
	
	/**
	 * nivel_jerarquico_id
	 */
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "nivel_jerarquico_id", nullable=false)
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
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Get
	 * @return the modulo
	 */
	public Modulo getModulo() {
		return modulo;
	}

	/**
	 * Set
	 * @param modulo the modulo to set
	 */
	public void setModulo(final Modulo modulo) {
		this.modulo = modulo;
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
	 * @return the ordenNivel
	 */
	public int getOrdenNivel() {
		return ordenNivel;
	}

	/**
	 * Set
	 * @param ordenNivel the ordenNivel to set
	 */
	public void setOrdenNivel(final int ordenNivel) {
		this.ordenNivel = ordenNivel;
	}

	@Override
	public String toString() {
		return "NivelesModulo [id=" + id + ", id_nivel_jerarquico=" + nivelJerarquico + ", ordenNivel=" + ordenNivel + "]";
	}


	
	
	
}
