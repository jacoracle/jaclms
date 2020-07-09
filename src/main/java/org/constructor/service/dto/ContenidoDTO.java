package org.constructor.service.dto;


/**
 * The Class ContenidoDTO.
 */
public class ContenidoDTO {
	
	/** The id. */
	private Long id;
	
	/** The contenido. */
	private String contenido;

	/** The nombre. */
	private String nombre;
	
	/** The extension. */
	private String extension;
	
	/** The peso. */
	private Long peso;
	
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
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Gets the contenido.
	 *
	 * @return the contenido
	 */
	public String getContenido() {
		return contenido;
	}

	/**
	 * Sets the contenido.
	 *
	 * @param contenido the contenido to set
	 */
	public void setContenido(final String contenido) {
		this.contenido = contenido;
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
	public void setNombre(final String nombre) {
		this.nombre = nombre;
	}

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
	public void setPeso(Long peso) {
		this.peso = peso;
	}

	@Override
	public String toString() {
		return "ContenidoDTO [id=" + id + ", contenido=" + contenido + ", nombre= " + nombre + ", extension=" + extension +", peso=" + peso + "]";
	}
	
}
