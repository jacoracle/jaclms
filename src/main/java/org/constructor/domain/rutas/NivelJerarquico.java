/**
 * 
 */
package org.constructor.domain.rutas;

import java.io.Serializable;
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
import javax.persistence.Table;

import org.constructor.domain.EstructuraJerarquica;
import org.constructor.domain.agrupador.Agrupador;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "nivel_jerarquico")
public class NivelJerarquico implements Serializable{

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = -6498803080885861573L;

	
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
	 * String imagenUrl
	 */
	@Column(name = "imagen_url ")
	private String imagenUrl ;
	
	
    /**
     * agrupadores
     */
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "niveles_agrupadores", 
            joinColumns = @JoinColumn(name = "agrupador_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="nivel_jerarquico_id", referencedColumnName = "id", nullable = false))
	private Set<Agrupador> agrupadores   = new HashSet<>();
    
	
	/**
	 * estructuraJerarquica
	 */
	@JsonIgnore
	@OneToMany(mappedBy = "nivel", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private Set<EstructuraJerarquica> estructuraJerarquica = new HashSet<>();
	
	 /**
     * nivelRutas
     */
	@JsonIgnore
    @OneToMany(mappedBy = "nivelJerarquico", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
    private Set<NivelRuta> nivelRuta = new HashSet<>();
	

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
	 * @return the imagenUrl
	 */
	public String getImagenUrl() {
		return imagenUrl;
	}

	/**
	 * Set
	 * @param imagenUrl the imagenUrl to set
	 */
	public void setImagenUrl(final String imagenUrl) {
		this.imagenUrl = imagenUrl;
	}

	/**
	 * Get
	 * @return the agrupadores
	 */
	public Set<Agrupador> getAgrupadores() {
		return agrupadores;
	}

	/**
	 * Set
	 * @param agrupadores the agrupadores to set
	 */
	public void setAgrupadores(final Set<Agrupador> agrupadores) {
		this.agrupadores = agrupadores;
	}


	/**
	 * Get
	 * @return the estructuraJerarquica
	 */
	public Set<EstructuraJerarquica> getEstructuraJerarquica() {
		return estructuraJerarquica;
	}

	/**
	 * Set
	 * @param estructuraJerarquica the estructuraJerarquica to set
	 */
	public void setEstructuraJerarquica(final Set<EstructuraJerarquica> estructuraJerarquica) {
		this.estructuraJerarquica = estructuraJerarquica;
	}

	/**
	 * Get
	 * @return the nivelRutas
	 */
	public Set<NivelRuta> getNivelRuta() {
		return nivelRuta;
	}

	/**
	 * Set
	 * @param nivelRutas the nivelRutas to set
	 */
	public void setNivelRutas(final Set<NivelRuta> nivelRuta) {
		this.nivelRuta = nivelRuta;
	}
	
	/**
	 * equals
	 */
	@Override
	   public boolean equals(Object obj) {
        if (obj == this) {
            return true;
        }
        if (!(obj instanceof NivelJerarquico)) {
            return false;
        }
        NivelJerarquico other = (NivelJerarquico) obj;
        return this.id.equals(other.id);
    }

	/**
	 * hashCode
	 */
	@Override

	   public int hashCode() {
	        return id.hashCode();
	    }

	@Override
	public String toString() {
		return "NivelJerarquico [id=" + id + ", nombre=" + nombre + ", imagenUrl=" + imagenUrl + ", agrupadores="
				+ agrupadores + ", estructuraJerarquica=" + estructuraJerarquica + ", nivelRutas=" + nivelRuta + "]";
	}
	
	
	
}
