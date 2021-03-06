package org.constructor.multimedia.response;

import org.constructor.utils.ParamOutputTO;

public class VideoResponse<T> extends ParamOutputTO<T> {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * String name
	 */
	private String nombre;
	
	/**
	 * String path
	 */
	private String path;
	
	/**
	 * Extension
	 */
	private String extension;
	
	/**
	 * Peso
	 */
	private Long peso ; 
	
	

	/**
	 * @return the extension
	 */
	public String getExtension() {
		return extension;
	}

	/**
	 * @param extension the extension to set
	 */
	public void setExtension(final String extension) {
		this.extension = extension;
	}

	/**
	 * @return the peso
	 */
	public Long getPeso() {
		return peso;
	}

	/**
	 * @param peso the peso to set
	 */
	public void setPeso(final Long peso) {
		this.peso = peso;
	}

	/**
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Get 
	 * @return the path
	 */
	public String getPath() {
		return path;
	}

	/**
	 * Set
	 * @param path
	 */
	public void setPath(final String path) {
		this.path = path;
	}
	
}
