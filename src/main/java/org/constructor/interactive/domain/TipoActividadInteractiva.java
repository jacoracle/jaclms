/**
 * 
 */
package org.constructor.interactive.domain;

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

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "tipo_actividad_interactiva")
public class TipoActividadInteractiva implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -4920161289215877136L;

	/**
	 * Long Id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * String tipoActividad
	 */
	@Column(name = "tipoActividad ")
	private String tipoActividad ;
	
	/**
	 * subtipo
	 */
	@Column(name = "subtipo")
	private String subtipo;
	
	/**
	 * opcion
	 */
	@Column(name = "opcion")
	private String opcion;
	
	
	/**
	 * actividadInteractiva
	 */
	@JsonIgnore
    @OneToMany(mappedBy = "tipoActividadInteractiva", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ActividadInteractiva>  actividadesInteractivas;
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
	 * @return the tipoActividad
	 */
	public String getTipoActividad() {
		return tipoActividad;
	}

	/**
	 * Set
	 * @param tipoActividad the tipoActividad to set
	 */
	public void setTipoActividad(final String tipoActividad) {
		this.tipoActividad = tipoActividad;
	}

	/**
	 * Get
	 * @return the subtipo
	 */
	public String getSubtipo() {
		return subtipo;
	}

	/**
	 * Set
	 * @param subtipo the subtipo to set
	 */
	public void setSubtipo(final String subtipo) {
		this.subtipo = subtipo;
	}

	/**
	 * Get
	 * @return the opcion
	 */
	public String getOpcion() {
		return opcion;
	}

	/**
	 * Set
	 * @param opcion the opcion to set
	 */
	public void setOpcion(final String opcion) {
		this.opcion = opcion;
	}

	/**
	 * @return the actividadesInteractivas
	 */
	public Set<ActividadInteractiva> getActividadesInteractivas() {
		return actividadesInteractivas;
	}

	/**
	 * @param actividadesInteractivas the actividadesInteractivas to set
	 */
	public void setActividadesInteractivas(Set<ActividadInteractiva> actividadesInteractivas) {
		this.actividadesInteractivas = actividadesInteractivas;
	}






	
}
