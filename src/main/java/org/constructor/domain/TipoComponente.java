package org.constructor.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A TipoComponente.
 */
@Entity
@Table(name = "tipo_componente")
public class TipoComponente implements Serializable {
	
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
	@Column(name = "nombre_componente")
    private String nombre;
	
	/**
	 * tiposComponentes
	 */
	@ManyToMany(mappedBy = "tiposComponentes")
	@JsonIgnore
    private Set<TipoBloqueComponentes> tiposBloquesComponentes = new HashSet<>();
	
	/**
	 * tipoComponente
	 */
	@OneToMany(mappedBy="tipoComponente", fetch = FetchType.EAGER)
	@JsonIgnore
	private Set<Componente> componente = new HashSet<>();

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
	 * @return the tiposBloquesComponentes
	 */
	public Set<TipoBloqueComponentes> getTiposBloquesComponentes() {
		return tiposBloquesComponentes;
	}

	/**
	 * Set
	 * @param tiposBloquesComponentes
	 */
	public void setTiposBloquesComponentes(Set<TipoBloqueComponentes> tiposBloquesComponentes) {
		this.tiposBloquesComponentes = tiposBloquesComponentes;
	}

	/**
	 * Get
	 * @return the  componente
	 */
	public Set<Componente> getComponente() {
		return componente;
	}

	/**
	 * Set
	 * @param componente
	 */
	public void setComponente(Set<Componente> componente) {
		this.componente = componente;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "TipoComponente [id=" + id + ", nombreComponente=" + nombre + "]";
	}
}
