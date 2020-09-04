/**
 * 
 */
package org.constructor.domain.module;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "temas")
public class Temas implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 3164563005357070156L;

	

	/**
	 * Long id
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	
    private Long id;
	
	/**
	 * String nombre
	 */
	
	@Column(name = "nombre")
    private String nombre;

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
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Set
	 * @param nombre the nombre to set
	 */
	public void setNombre(final String nombre) {
		this.nombre = nombre;
	}

	
	   /**
     * toString
     */
	@Override
	public String toString() {
		return "Temas [id=" + id + ", nombre=" + nombre +  "]";
	}
	
}
