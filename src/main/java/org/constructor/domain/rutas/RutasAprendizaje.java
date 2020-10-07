/**
 * 
 */
package org.constructor.domain.rutas;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;



/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "rutas_aprendizaje")
public class RutasAprendizaje implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 2143428899012978484L;
	
	/**
	 * Long id
	 */
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * String nombre
	 */
	@Column(name = "nombre ")
	private String nombre ;

	/**
	 * NivelRuta
	 */
	 
	@OneToMany(mappedBy = "rutasAprendizaje", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private Set<NivelRuta> nivelRutas;
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
	 * Get
	 * @return the nivelRutas
	 */
	public Set<NivelRuta> getNivelRutas() {
		return nivelRutas;
	}

	/**
	 * Set
	 * @param nivelRutas the nivelRutas to set
	 */
	public void setNivelRutas(final Set<NivelRuta> nivelRutas) {
		this.nivelRutas = nivelRutas;
	}

	/**
	 * ToString
	 */
	@Override
	public String toString() {
		return "RutasAprendizaje [id=" + id + ", nombre=" + nombre + "]";
	}
	
	
	
	
}
