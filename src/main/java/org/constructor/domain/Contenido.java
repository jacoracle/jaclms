package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: Auto-generated Javadoc
/**
 * The Class Contenido.
 */
@Entity
@Table(name = "contenido")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Contenido  implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The id. */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id")
    private Long id;
	
	/** The contenido. */
	@Column(name = "contenido")
	private String contenido;
	
	/** The nombre. */
	@Column(name = "nombre")
	private String nombre;
	
	/** The extension. */
	@Column(name = "extension")
	private String extension;
	
	/** The peso. */
	@Column(name = "peso")
	private Long peso;
	
	/** The componente. */
	@OneToOne 
	@JoinColumn(name = "componente_id")
    @JsonIgnore
	private Componente componente;

	

	/**
	 * Instantiates a new contenido.
	 * 
	 * @param id
	 * @param contenido
	 * @param nombre
	 * @param extension
	 * @param peso
	 * @param componente
	 */
	public Contenido(Long id, String contenido, String nombre, String extension, Long peso, Componente componente) {
		super();
		this.id = id;
		this.contenido = contenido;
		this.nombre = nombre;
		this.extension = extension;
		this.peso = peso;
		this.componente = componente;
	}



	/**
	 * Instantiates a new contenido.
	 */
	public Contenido() {
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
	public void setContenido(String contenido) {
		this.contenido = contenido;
	}
	
	

	/**
	 * Get
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}



	/**
	 * Set
	 * @param nombre the nombre to set
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}



	/**
	 * Get
	 * @return the extension
	 */
	public String getExtension() {
		return extension;
	}



	/**
	 * Set
	 * @param extension the extension to set
	 */
	public void setExtension(String extension) {
		this.extension = extension;
	}



	/**
	 * Get
	 * @return the peso
	 */
	public Long getPeso() {
		return peso;
	}



	/**
	 * Set
	 * @param peso the peso to set
	 */
	public void setPeso(Long peso) {
		this.peso = peso;
	}



	/**
	 * Gets the componente.
	 *
	 * @return the componente
	 */
	public Componente getComponente() {
		return componente;
	}

	/**
	 * Sets the componente.
	 *
	 * @param componente the componente to set
	 */
	public void setComponente(Componente componente) {
		this.componente = componente;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "Contenido [id=" + id + ", contenido=" + contenido + ", nombre= " + nombre + ", extension=" + extension +", peso=" + peso + "]";
	}

}
