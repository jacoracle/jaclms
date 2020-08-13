/**
 * 
 */
package org.constructor.interactive.domain;

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



/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "actividad_interactiva")
@TypeDef(
	    name = "json",
	    typeClass = JsonStringType.class
	)
public class ActividadInteractiva implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 1578677852309450903L;
	
	/**
	 * Long Id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	/**
	 * 	Json contenido
	 */
	@Type( type = "json" )
	@Column( columnDefinition = "contenido" )
	private Object contenido;
	
	/**
	 * Boolean evaluable
	 */
	@Column(name = "evaluable") 
	private Boolean evaluable;
	
	/**
	 * Long intentos
	 */
	@Column(name = "intentos")
	private Long intentos;
	
	/**
	 * Long gamificacion
	 */
	@Column(name = "gamificacion")
	private Long gamificacion;
	
	
	@ManyToOne
    @JoinColumn(name = "tipo_actividad_interactiva_id")
    private TipoActividadInteractiva tipoActividadInteractiva; 
	
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "componente_id", nullable=false)
    private Componente componente; 

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
	 * @return the contenido
	 */
	public Object getContenido() {
		return contenido;
	}

	/**
	 * @param contenido the contenido to set
	 */
	public void setContenido(Object contenido) {
		this.contenido = contenido;
	}

	/**
	 * Get
	 * @return the evaluable
	 */
	public Boolean getEvaluable() {
		return evaluable;
	}

	/**
	 * Set
	 * @param evaluable the evaluable to set
	 */
	public void setEvaluable(final Boolean evaluable) {
		this.evaluable = evaluable;
	}

	/**
	 * Get
	 * @return the intentos
	 */
	public Long getIntentos() {
		return intentos;
	}

	/**
	 * Set
	 * @param intentos the intentos to set
	 */
	public void setIntentos(final Long intentos) {
		this.intentos = intentos;
	}

	/**
	 * Get
	 * @return the gamificacion
	 */
	public Long getGamificacion() {
		return gamificacion;
	}

	/**
	 * Set
	 * @param gamificacion the gamificacion to set
	 */
	public void setGamificacion(final Long gamificacion) {
		this.gamificacion = gamificacion;
	}

	/**
	 * @return the tipoActividadInteractiva
	 */
	public TipoActividadInteractiva getTipoActividadInteractiva() {
		return tipoActividadInteractiva;
	}

	/**
	 * @param tipoActividadInteractiva the tipoActividadInteractiva to set
	 */
	public void setTipoActividadInteractiva(TipoActividadInteractiva tipoActividadInteractiva) {
		this.tipoActividadInteractiva = tipoActividadInteractiva;
	}
	
	

	/**
	 * @return the componente
	 */
	public Componente getComponente() {
		return componente;
	}

	/**
	 * @param componente the componente to set
	 */
	public void setComponente(final Componente componente) {
		this.componente = componente;
	}

	/**
	 * ToString
	 */
	@Override
	public String toString() {
		return "ActividadInteractiva [id=" + id + ", contenido=" + contenido + ", evaluable=" + evaluable
				+ ", intentos=" + intentos + ", gamificacion=" + gamificacion + ", tipoActividadInteractiva="
				+ tipoActividadInteractiva + "]";
	}


}
