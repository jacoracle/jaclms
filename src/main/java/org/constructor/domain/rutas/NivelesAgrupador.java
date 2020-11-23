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

import org.constructor.domain.agrupador.Agrupador;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "niveles_agrupador")
public class NivelesAgrupador  implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -6298239855496444231L;

	
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
	 * agrupador_id
	 */
	@ManyToOne
	@JsonIgnore
    @JoinColumn(name = "agrupador_id", nullable=false)
    private Agrupador agrupador;
	
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
	 * @return the agrupador
	 */
	public Agrupador getAgrupador() {
		return agrupador;
	}

	/**
	 * Set
	 * @param agrupador the agrupador to set
	 */
	public void setAgrupador(final Agrupador agrupador) {
		this.agrupador = agrupador;
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
	
	
	
}
