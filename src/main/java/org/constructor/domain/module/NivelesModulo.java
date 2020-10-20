/**
 * 
 */
package org.constructor.domain.module;

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
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

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
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "modulo_id")
	@JsonIgnore
    private Modulo modulo;
	
	/**
	 * nivel_jerarquico_id
	 */
	
	@ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	@JoinColumn(name = "nivel_modulo_id", nullable=false)
    private NivelModulo nivelModulo;
	
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
	 * @return
	 */
	public NivelModulo getNivelModulo() {
		return nivelModulo;
	}

	/**
	 * Set
	 * @param nivelModulo
	 */
	public void setNivelModulo(NivelModulo nivelModulo) {
		this.nivelModulo = nivelModulo;
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
		return "NivelesModulo [id=" + id + ", id_nivel_modulo=" + nivelModulo + ", ordenNivel=" + ordenNivel + "]";
	}


	
	
	
}
