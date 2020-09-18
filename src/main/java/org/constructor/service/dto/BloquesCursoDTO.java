package org.constructor.service.dto;

import org.constructor.service.dto.module.NivelModuloDTO;

/**
 * The Class BloquesCursoDTO.
 */
public class BloquesCursoDTO {
	
	/** The id. */
	private Long id;
	
	/** The bloque componentes. */
	private BloqueComponentesDTO bloqueComponentes;
	
	/** The orden. */
	private Long orden;
	
	/** The mostrar. */
	private Boolean visible;
	
	/** The indicador original. */
	private Long indicadorOriginal;
	
	/** The autor. */
	private Long autor;
	
	/** The nivel jerarquico DTO. */
	private NivelModuloDTO nivelJerarquico; 

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
	 * Gets the bloque componentes.
	 *
	 * @return the bloqueComponentes
	 */
	public BloqueComponentesDTO getBloqueComponentes() {
		return bloqueComponentes;
	}

	/**
	 * Sets the bloque componentes.
	 *
	 * @param bloqueComponentes the bloqueComponentes to set
	 */
	public void setBloqueComponentes(BloqueComponentesDTO bloqueComponentes) {
		this.bloqueComponentes = bloqueComponentes;
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
	 * Gets the visible.
	 *
	 * @return the visible
	 */
	public Boolean getVisible() {
		return visible;
	}

	/**
	 * Sets the visible.
	 *
	 * @param visible the new visible
	 */
	public void setVisible(Boolean visible) {
		this.visible = visible;
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
	 * Gets the autor.
	 *
	 * @return the autor
	 */
	public Long getAutor() {
		return autor;
	}

	/**
	 * Sets the autor.
	 *
	 * @param autor the autor to set
	 */
	public void setAutor(Long autor) {
		this.autor = autor;
	}
	
	

	/**
	 * @return the nivelJerarquico
	 */
	public NivelModuloDTO getNivelJerarquico() {
		return nivelJerarquico;
	}

	/**
	 * @param nivelJerarquico the nivelJerarquico to set
	 */
	public void setNivelJerarquico(NivelModuloDTO nivelJerarquico) {
		this.nivelJerarquico = nivelJerarquico;
	}

	@Override
	public String toString() {
		return "BloquesCursoDTO [id=" + id + ", bloqueComponentes=" + bloqueComponentes + ", orden=" + orden
				+ ", visible=" + visible + ", indicadorOriginal=" + indicadorOriginal + ", autor=" + autor
				+ ", nivelJerarquico=" + nivelJerarquico + "]";
	}

}
