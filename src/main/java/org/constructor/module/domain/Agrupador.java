/**
 * 
 */
package org.constructor.module.domain;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
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


import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;


import com.fasterxml.jackson.annotation.JsonManagedReference;


/**
 * @author Edukai
 *
 */

@Entity
@Table(name = "agrupador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agrupador  implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 5990216025368454112L;

	/**
	 * Long id
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	 /**
     * String titulo
     */
    @Column(name = "titulo")
    private String titulo;
    
    /**
     * String descripcion
     */
    @Column(name = "descripcion")
    private String descripcion;
    

    
    /**
     * LocalDate fechaInicio
     */
    @Column(name = "fecha_inicio")
    private LocalDate fechaInicio;
    
    /**
     * LocalDate fechaFin
     */
    @Column(name = "fecha_fin")
    private LocalDate fechaFin;
     
    /**
     * Etiqueta
     */
    @OneToMany(mappedBy = "agrupador", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Etiqueta> etiquetas = new HashSet<>();
 

    @OneToMany(mappedBy = "agrupador", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    @Column(nullable = true)
    @JsonManagedReference
    private Set<AgrupadorModulo> modulos = new HashSet<>();
    

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
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Get
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * Set
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Get
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Set
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}


	/**
	 * Get
	 * @return the fechaInicio
	 */
	public LocalDate getFechaInicio() {
		return fechaInicio;
	}

	/**
	 * Set
	 * @param fechaInicio the fechaInicio to set
	 */
	public void setFechaInicio(LocalDate fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	/**
	 * Get
	 * @return the fechaFin
	 */
	public LocalDate getFechaFin() {
		return fechaFin;
	}

	/**
	 * Set
	 * @param fechaFin the fechaFin to set
	 */
	public void setFechaFin(LocalDate fechaFin) {
		this.fechaFin = fechaFin;
	}
	
	

	/**
	 * @return the modulos
	 */
	public Set<AgrupadorModulo> getModulos() {
		return modulos;
	}

	/**
	 * @param modulos the modulos to set
	 */
	public void setModulos(Set<AgrupadorModulo> modulos) {
		this.modulos = modulos;
	}

	

	/**
	 * @return the etiquetas
	 */
	public Set<Etiqueta> getEtiquetas() {
		return etiquetas;
	}

	/**
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiquetas(Set<Etiqueta> etiquetas) {
		this.etiquetas = etiquetas;
	}







    
    
    
    
    
}
