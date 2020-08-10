/**
 * 
 */
package org.constructor.module.domain;

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
@Table(name = "etiqueta_agrupador")
public class Etiqueta implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -1793607505688808713L;

	 /**
     * Long id 
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * String etiqueta
     */
    @Column(name = "descripcion")
    private String descripcion;
    

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}


	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}


	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}


	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	@Override
	public String toString() {
		return "Etiquetas [id=" + id + ", descripcion=" + descripcion + "]";
	}




	
    
    
    
}
