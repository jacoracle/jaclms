package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A Pais.
 */
@Entity
@Table(name = "pais")
public class Pais implements Serializable {
	
	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 1L;
	
	/**
	 * Long id
	 */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/**
	 * String nombre
	 */
	@JsonIgnore
	@Column(name = "nombre")
    private String nombre;

	/**
	 * String name
	 */
	@JsonIgnore
	@Column(name = "name")
    private String name;
			
	/**
	 * String iso3
	 */
	@Column(name = "iso3")
    private String iso3;
	
	/**
	 * String phoneCode
	 */
	@Column(name = "codigo_Telefonico")
    private String codigoTelefonico;

	/**
	 * Get
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set
	 * @param id
	 */
	public void setId(Long id) {
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
	 * @param nombre
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Get
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * Set
	 * @param name
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * Get
	 * @return the iso3
	 */
	public String getIso3() {
		return iso3;
	}

	/**
	 * Set
	 * @param iso3
	 */
	public void setIso3(String iso3) {
		this.iso3 = iso3;
	}

	

	/**
	 * @return the codigoTelefonico
	 */
	public String getCodigoTelefonico() {
		return codigoTelefonico;
	}

	/**
	 * @param codigoTelefonico the codigoTelefonico to set
	 */
	public void setCodigoTelefonico(String codigoTelefonico) {
		this.codigoTelefonico = codigoTelefonico;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "Pais [id=" + id + ", nombre=" + nombre + ", name=" + name + ", iso2="  + ", codigoTelefonico="
				+ codigoTelefonico + "]";
	}
	
	
}
