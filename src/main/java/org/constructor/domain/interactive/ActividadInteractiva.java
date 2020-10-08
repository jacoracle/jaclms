/**
 * 
 */
package org.constructor.domain.interactive;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.constructor.domain.Componente;
import org.hibernate.annotations.Type;
import org.hibernate.annotations.TypeDef;

import com.fasterxml.jackson.annotation.JsonIgnore;

import com.vladmihalcea.hibernate.type.json.JsonStringType;



// TODO: Auto-generated Javadoc
/**
 * The Class ActividadInteractiva.
 *
 * @author Edukai
 */
@Entity
@Table(name = "actividad_interactiva")
@TypeDef(
	    name = "json",
	    typeClass = JsonStringType.class
	)
public class ActividadInteractiva implements Serializable{

	/** Serializable. */
	private static final long serialVersionUID = 1578677852309450903L;
	
	/** Long Id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	/** The nombre. */
	@Column(name = "nombre")
	private String nombre;

	/** 	Json contenido. */
	@Type( type = "json" )
	@Column( columnDefinition = "contenido" )
	private Object contenido;
	
	/** Boolean evaluable. */
	@Column(name = "evaluable") 
	private Boolean evaluable;
	
	/** Long intentos. */
	@Column(name = "intentos")
	private Long intentos;
	
	/** Long gamificacion. */
	@Column(name = "gamificacion")
	private Long gamificacion;
	
	
	/** The tipo actividad interactiva. */
	@ManyToOne
    @JoinColumn(name = "tipo_actividad_interactiva_id")
    private TipoActividadInteractiva tipoActividadInteractiva; 
	
	/** The componente. */
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "componente_id", nullable=false)
    private Componente componente; 

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
	 * @param id the id to set
	 */
	public void setId(final Long id) {
		this.id = id;
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
	 * Gets the contenido.
	 *
	 * @return the contenido
	 */
	public Object getContenido() {
		return contenido;
	}

	/**
	 * Sets the contenido.
	 *
	 * @param contenido the contenido to set
	 */
	public void setContenido(Object contenido) {
		this.contenido = contenido;
	}

	/**
	 * Get.
	 *
	 * @return the evaluable
	 */
	public Boolean getEvaluable() {
		return evaluable;
	}

	/**
	 * Set.
	 *
	 * @param evaluable the evaluable to set
	 */
	public void setEvaluable(final Boolean evaluable) {
		this.evaluable = evaluable;
	}

	/**
	 * Get.
	 *
	 * @return the intentos
	 */
	public Long getIntentos() {
		return intentos;
	}

	/**
	 * Set.
	 *
	 * @param intentos the intentos to set
	 */
	public void setIntentos(final Long intentos) {
		this.intentos = intentos;
	}

	/**
	 * Get.
	 *
	 * @return the gamificacion
	 */
	public Long getGamificacion() {
		return gamificacion;
	}

	/**
	 * Set.
	 *
	 * @param gamificacion the gamificacion to set
	 */
	public void setGamificacion(final Long gamificacion) {
		this.gamificacion = gamificacion;
	}

	/**
	 * Gets the tipo actividad interactiva.
	 *
	 * @return the tipoActividadInteractiva
	 */
	public TipoActividadInteractiva getTipoActividadInteractiva() {
		return tipoActividadInteractiva;
	}

	/**
	 * Sets the tipo actividad interactiva.
	 *
	 * @param tipoActividadInteractiva the tipoActividadInteractiva to set
	 */
	public void setTipoActividadInteractiva(TipoActividadInteractiva tipoActividadInteractiva) {
		this.tipoActividadInteractiva = tipoActividadInteractiva;
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
	public void setComponente(final Componente componente) {
		this.componente = componente;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "ActividadInteractiva [id=" + id + ", nombre=" + nombre + ", contenido=" + contenido + ", evaluable="
				+ evaluable + ", intentos=" + intentos + ", gamificacion=" + gamificacion
				+ ", tipoActividadInteractiva=" + tipoActividadInteractiva + ", componente=" + componente + "]";
	}

}
