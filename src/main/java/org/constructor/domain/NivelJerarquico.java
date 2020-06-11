package org.constructor.domain;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: Auto-generated Javadoc
/**
 * A NivelJeraquico.
 */
@Entity
@Table(name = "nivel_jerarquico")
public class NivelJerarquico implements Serializable  {
		
	/** Serializable. */
	private static final long serialVersionUID = 1L;
		
	/** Long id. */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/** String nombre. */
	@Column(name = "nombre")
    private String nombre;
	
	/** int informacionAdicional. */
	@Column(name = "informacion_adicional")
    private int  informacionAdicional;
	
	/** String tipo. */
	@Column(name = "tipo")
    private String  tipo;
	
	/** orden_nivel. */
	@OneToMany(mappedBy="nivelJerarquico", fetch = FetchType.EAGER)
	@OrderBy ("orden")
	private Set<EstructuraJerarquica> estructuraJerarquica = new HashSet<>();
		
	/** nivelJerarquico. */
	@OneToMany(mappedBy = "nivelJerarquico")
	@JsonIgnore
	private Set<NivelesCurso> nivelesCurso = new HashSet<>(); 
	
	/** The bloques curso. */
	@OneToMany(mappedBy = "nivelJerarquico")
	@JsonIgnore
	private Set<BloquesCurso> bloquesCurso;
	

	/**
	 * Get.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}
	
	/**
	 * Get.
	 *
	 * @return the informacionAdicional
	 */
	public int getInformacionAdicional() {
		return informacionAdicional;
	}

	/**
	 * Set.
	 *
	 * @param informacionAdicional the new informacion adicional
	 */
	public void setInformacionAdicional(int informacionAdicional) {
		this.informacionAdicional = informacionAdicional;
	}

	/**
	 * Get .
	 *
	 * @return the estructuraJerarquica
	 */
	public Set<EstructuraJerarquica> getEstructuraJerarquica() {
		return estructuraJerarquica;
	}

	/**
	 * Set.
	 *
	 * @param estructuraJerarquica the new estructura jerarquica
	 */
	public void setEstructuraJerarquica(Set<EstructuraJerarquica> estructuraJerarquica) {
		this.estructuraJerarquica = estructuraJerarquica;
	}

	/**
	 * Get.
	 *
	 * @return the nombre
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Set.
	 *
	 * @param nombre the new nombre
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Get.
	 *
	 * @return the tipo
	 */
	public String getTipo() {
		return tipo;
	}

	/**
	 * Set.
	 *
	 * @param tipo the new tipo
	 */
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	
	/**
	 * Gets the niveles curso.
	 *
	 * @return the nivelesCurso
	 */
	public Set<NivelesCurso> getNivelesCurso() {
		return nivelesCurso;
	}

	/**
	 * Sets the niveles curso.
	 *
	 * @param nivelesCurso the nivelesCurso to set
	 */
	public void setNivelesCurso(Set<NivelesCurso> nivelesCurso) {
		this.nivelesCurso = nivelesCurso;
	}

	/**
	 * Gets the bloques curso.
	 *
	 * @return the bloquesCurso
	 */
	public Set<BloquesCurso> getBloquesCurso() {
		return bloquesCurso;
	}

	/**
	 * Sets the bloques curso.
	 *
	 * @param bloquesCurso the bloquesCurso to set
	 */
	public void setBloquesCurso(Set<BloquesCurso> bloquesCurso) {
		this.bloquesCurso = bloquesCurso;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "NivelJerarquico [id=" + id + ", nombre=" + nombre + ", informacionAdicional=" + informacionAdicional
				+ ", tipo=" + tipo + ", estructuraJerarquica=" + estructuraJerarquica + ", nivelesCurso=" + nivelesCurso
				+ "]";
	}


}
