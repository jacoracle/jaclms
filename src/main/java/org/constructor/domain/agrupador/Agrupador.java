/**
 * 
 */
package org.constructor.domain.agrupador;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.constructor.domain.User;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;


// TODO: Auto-generated Javadoc
/**
 * The Class Agrupador.
 *
 * @author Edukai
 */

@Entity
@Table(name = "agrupador")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Agrupador  implements Serializable{

	/** Serializable. */
	private static final long serialVersionUID = 5990216025368454112L;

	/** Long id. */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	 /** String titulo. */
    @Column(name = "titulo")
    private String titulo;
    
    /** String descripcion. */
    @Column(name = "descripcion")
    private String descripcion;
    
    /** The duracion. */
    @Column(name = "duracion")
    private int duracion;
    
    /** LocalDate fechaInicio. */
    @Column(name = "fecha_inicio")
    private LocalDateTime fechaInicio;
    
    /** LocalDate fechaFin. */
    @Column(name = "fecha_fin")
    private LocalDateTime fechaFin;
     
    /** Etiqueta. */
    @OneToMany( fetch = FetchType.EAGER,cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "agrupador_id")
    @OrderBy
    private Set<Etiqueta> etiquetas = new HashSet<>();
 

    /** modulos. */
    @OneToMany(mappedBy = "agrupador", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    @Column(nullable = true)
    @JsonManagedReference
	@OrderBy ("orden ASC")
    private Set<AgrupadorModulo> modulos = new HashSet<>();
    
    
    /** user. */
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "agrupador_usuario", 
            joinColumns = @JoinColumn(name = "agrupador_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="usuario_id", referencedColumnName = "id", nullable = false))
    private Set<User> user = new HashSet<>();

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
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Get.
	 *
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * Set.
	 *
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Get.
	 *
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Set.
	 *
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	 /**
 	 * Gets the duracion.
 	 *
 	 * @return the duracion
 	 */
 	public int getDuracion() {
		return duracion;
	}

	/**
	 * Sets the duracion.
	 *
	 * @param duracion the new duracion
	 */
	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}

	/**
	 * Gets the fecha inicio.
	 *
	 * @return the fechaInicio
	 */
	public LocalDateTime getFechaInicio() {
		return fechaInicio;
	}

	/**
	 * Sets the fecha inicio.
	 *
	 * @param fechaInicio the fechaInicio to set
	 */
	public void setFechaInicio(LocalDateTime fechaInicio) {
	       this.fechaInicio = LocalDateTime.now();;
	}

	/**
	 * Agrupador.
	 *
	 * @param fechaInicio the fecha inicio
	 * @return the agrupador
	 */
   public Agrupador fechaInicio(LocalDateTime fechaInicio) {
       this.fechaInicio = LocalDateTime.now();;
       return this;
   }


	/**
	 * Gets the fecha fin.
	 *
	 * @return the fechaFin
	 */
	public LocalDateTime getFechaFin() {
		return fechaFin;
	}

	/**
	 * Sets the fecha fin.
	 *
	 * @param fechaFin the fechaFin to set
	 */
	public void setFechaFin(LocalDateTime fechaFin) {
	       this.fechaFin = LocalDateTime.now();;
	}

	/**
	 * Agrupador.
	 *
	 * @param fechaFin the fecha fin
	 * @return the agrupador
	 */
   public Agrupador fechaFin(LocalDateTime fechaFin) {
       this.fechaFin = LocalDateTime.now();;
       return this;
   }
	

	/**
	 * Gets the modulos.
	 *
	 * @return the modulos
	 */
	public Set<AgrupadorModulo> getModulos() {
		return modulos;
	}

	/**
	 * Sets the modulos.
	 *
	 * @param modulos the modulos to set
	 */
	public void setModulos(Set<AgrupadorModulo> modulos) {
		this.modulos = modulos;
	}

	

	/**
	 * Gets the etiquetas.
	 *
	 * @return the etiquetas
	 */
	public Set<Etiqueta> getEtiquetas() {
		return etiquetas;
	}

	/**
	 * Sets the etiquetas.
	 *
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiquetas(Set<Etiqueta> etiquetas) {
		this.etiquetas = etiquetas;
	}
	

	/**
	 * Gets the user.
	 *
	 * @return the user
	 */
	public Set<User> getUser() {
		return user;
	}

	/**
	 * Sets the user.
	 *
	 * @param user the user to set
	 */
	public void setUser(Set<User> user) {
		this.user = user;
	}
	
	/**
	 * equals.
	 *
	 * @param obj the obj
	 * @return true, if successful
	 */
	@Override
	   public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof Agrupador)) {
            return false;
        }
        Agrupador other = (Agrupador) obj;
        return this.id.equals(other.id);
    }

	/**
	 * hashCode.
	 *
	 * @return the int
	 */
	@Override
 
	   public int hashCode() {
	        return id.hashCode();
	    }

	/**
	 * ToString 
	 */
	@Override
	public String toString() {
		return "Agrupador [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", duracion=" + duracion
				+ ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", etiquetas="  + "]";
	}

    
}
