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

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: Auto-generated Javadoc
/**
 * The Class BloquesCurso.
 */
@Entity
@Table(name = "bloques_curso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class BloquesCurso  implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The id. */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/** The orden. */
	@Column(name = "orden")
	@OrderBy
	private Long orden;
	
	/** The mostrar. */
	@Column(name = "mostrar")
	private Long mostrar;
	
	/** The indicador original. */
	@Column(name = "indicador_original")
	private Long indicadorOriginal;
	
	/** The nivel jerarquico. */
	@ManyToOne
	@JoinColumn(name = "nivel_jerarquico_id", nullable=false)
	@JsonIgnore
	private NivelJerarquico nivelJerarquico;
	
	/** The bloque componentes. */
	@ManyToOne(fetch = FetchType.EAGER,cascade = CascadeType.REMOVE)
	@JoinColumn(name = "bloque_componentes_id", nullable=false)
	private BloqueComponentes bloqueComponentes;

	/**
	 * Instantiates a new bloques curso.
	 *
	 * @param id the id
	 * @param orden the orden
	 * @param mostrar the mostrar
	 * @param indicadorOriginal the indicador original
	 */
	public BloquesCurso(Long id, Long orden, Long mostrar, Long indicadorOriginal) {
		super();
		this.id = id;
		this.orden = orden;
		this.mostrar = mostrar;
		this.indicadorOriginal = indicadorOriginal;
	}
	
	/**
	 * Instantiates a new bloques curso.
	 */
	public BloquesCurso() {
		super();
		
	}


	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the orden.
	 *
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}

	/**
	 * Sets the orden.
	 *
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}

	/**
	 * Gets the mostrar.
	 *
	 * @return the mostrar
	 */
	public Long getMostrar() {
		return mostrar;
	}

	/**
	 * Sets the mostrar.
	 *
	 * @param mostrar the mostrar to set
	 */
	public void setMostrar(Long mostrar) {
		this.mostrar = mostrar;
	}

	/**
	 * Gets the indicador original.
	 *
	 * @return the indicadorOriginal
	 */
	public Long getIndicadorOriginal() {
		return indicadorOriginal;
	}

	/**
	 * Sets the indicador original.
	 *
	 * @param indicadorOriginal the indicadorOriginal to set
	 */
	public void setIndicadorOriginal(Long indicadorOriginal) {
		this.indicadorOriginal = indicadorOriginal;
	}

	/**
	 * Gets the nivel jerarquico.
	 *
	 * @return the nivelJerarquico
	 */
	public NivelJerarquico getNivelJerarquico() {
		return nivelJerarquico;
	}

	/**
	 * Sets the nivel jerarquico.
	 *
	 * @param nivelJerarquico the nivelJerarquico to set
	 */
	public void setNivelJerarquico(NivelJerarquico nivelJerarquico) {
		this.nivelJerarquico = nivelJerarquico;
	}
	
	/**
	 * Gets the bloque componentes.
	 *
	 * @return the bloqueComponentes
	 */
	public BloqueComponentes getBloqueComponentes() {
		return bloqueComponentes;
	}

	/**
	 * Sets the bloque componentes.
	 *
	 * @param bloqueComponentes the bloqueComponentes to set
	 */
	public void setBloqueComponentes(BloqueComponentes bloqueComponentes) {
		this.bloqueComponentes = bloqueComponentes;
	}

	@Override
	public String toString() {
		return "BloquesCurso [id=" + id + ", orden=" + orden + ", mostrar=" + mostrar + ", indicadorOriginal="
				+ indicadorOriginal + ", bloqueComponentes=" + bloqueComponentes + "]";
	}


}
