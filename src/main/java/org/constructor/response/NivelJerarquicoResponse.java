package org.constructor.response;

import java.util.List;


import org.constructor.domain.BloquesCurso;

/**
 * The Class NivelJerarquicoResponse.
 */
public class NivelJerarquicoResponse {
	
	/** The curso id. */
	private Long cursoId;
	
	/** The nivel id. */
	private Long nivelId;
	
	/** The nombre. */
	private String nombre;
	
	/** The tipo. */
	private String tipo;
	
	/** The informacion adicional. */
	private int informacionAdicional;
	
	/** The orden. */
	private int orden;
	
	/** The bloques componentes. */
	private List<BloquesCurso> bloquesCurso;
	
	/**
	 * Gets the curso id.
	 *
	 * @return the cursoId
	 */
	public Long getCursoId() {
		return cursoId;
	}
	
	/**
	 * Sets the curso id.
	 *
	 * @param cursoId the cursoId to set
	 */
	public void setCursoId(Long cursoId) {
		this.cursoId = cursoId;
	}
	
	/**
	 * Gets the nivel id.
	 *
	 * @return the nivelId
	 */
	public Long getNivelId() {
		return nivelId;
	}
	
	/**
	 * Sets the nivel id.
	 *
	 * @param nivelId the nivelId to set
	 */
	public void setNivelId(Long nivelId) {
		this.nivelId = nivelId;
	}
	
	/**
	 * Gets the nombre.
	 *
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}
	
	/**
	 * Sets the nombre.
	 *
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	
	/**
	 * Gets the tipo.
	 *
	 * @return the tipo
	 */
	public String getTipo() {
		return tipo;
	}
	
	/**
	 * Sets the tipo.
	 *
	 * @param tipo the tipo to set
	 */
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	/**
	 * Gets the informacion adicional.
	 *
	 * @return the informacionAdicional
	 */
	public int getInformacionAdicional() {
		return informacionAdicional;
	}
	
	/**
	 * Sets the informacion adicional.
	 *
	 * @param informacionAdicional the informacionAdicional to set
	 */
	public void setInformacionAdicional(int informacionAdicional) {
		this.informacionAdicional = informacionAdicional;
	}
	
	/**
	 * Gets the orden.
	 *
	 * @return the orden
	 */
	public int getOrden() {
		return orden;
	}
	
	/**
	 * Sets the orden.
	 *
	 * @param orden the orden to set
	 */
	public void setOrden(int orden) {
		this.orden = orden;
	}
		
	/**
	 * @return the bloquesCurso
	 */
	public List<BloquesCurso> getBloquesCurso() {
		return bloquesCurso;
	}

	/**
	 * @param bloquesCurso the bloquesCurso to set
	 */
	public void setBloquesCurso(List<BloquesCurso> bloquesCurso) {
		this.bloquesCurso = bloquesCurso;
	}
	



	@Override
	public String toString() {
		return "NivelJerarquicoResponse [cursoId=" + cursoId + ", nivelId=" + nivelId
				+ ", nombre=" + nombre + ", tipo=" + tipo + ", informacionAdicional=" + informacionAdicional
				+ ", orden=" + orden + ", bloquesCurso=" + bloquesCurso + "]";
	}

	

}
