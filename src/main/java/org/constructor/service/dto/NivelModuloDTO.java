package org.constructor.service.dto;

import java.util.Set;

/**
 * The Class NivelModuloDTO.
 */
public class NivelModuloDTO {
	
	/** The curso id. */
	private Long cursoId;
	
	/** The nivelId. */
	private Long nivelId;
	
	/** The nombre. */
	private String nombre;
	
	/** The tipo. */
	private String tipo;
	
	/** The orden nivel. */
	private int orden;
	
	/** The informacion adicional. */
	private int informacionAdicional;
	
	/** The bloques curso. */
	private Set<BloquesCursoDTO> bloquesCurso;

	/**
	 * Gets the curso id.
	 *
	 * @return the curso id
	 */
	public Long getCursoId() {
		return cursoId;
	}

	/**
	 * Sets the curso id.
	 *
	 * @param cursoId the new curso id
	 */
	public void setCursoId(Long cursoId) {
		this.cursoId = cursoId;
	}

	/**
	 * @return the nivelId
	 */
	public Long getNivelId() {
		return nivelId;
	}

	/**
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
	 * @param nombre the new nombre
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
	 * @param tipo the new tipo
	 */
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}

	/**
	 * Gets the informacion adicional.
	 *
	 * @return the informacion adicional
	 */
	public int getInformacionAdicional() {
		return informacionAdicional;
	}

	/**
	 * Sets the informacion adicional.
	 *
	 * @param informacionAdicional the new informacion adicional
	 */
	public void setInformacionAdicional(int informacionAdicional) {
		this.informacionAdicional = informacionAdicional;
	}


	/**
	 * Gets the orden nivel.
	 *
	 * @return the ordenNivel
	 */
	public int getOrden() {
		return orden;
	}

	/**
	 * Sets the orden nivel.
	 *
	 * @param ordenNivel the ordenNivel to set
	 */
	public void setOrden(int orden) {
		this.orden = orden;
	}
	

	/**
	 * @return the bloquesCurso
	 */
	public Set<BloquesCursoDTO> getBloquesCurso() {
		return bloquesCurso;
	}

	/**
	 * @param bloquesCurso the bloquesCurso to set
	 */
	public void setBloquesCurso(Set<BloquesCursoDTO> bloquesCurso) {
		this.bloquesCurso = bloquesCurso;
	}



	@Override
	public String toString() {
		return "NivelModuloDTO [cursoId=" + cursoId + ", nivelId=" + nivelId
				+ ", nombre=" + nombre + ", tipo=" + tipo + ", orden=" + orden + ", informacionAdicional="
				+ informacionAdicional + ", bloquesCurso=" + bloquesCurso + "]";
	}
	
	
	
	
}
