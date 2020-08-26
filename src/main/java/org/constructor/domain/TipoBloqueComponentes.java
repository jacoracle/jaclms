package org.constructor.domain;

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

import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.springframework.core.annotation.Order;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A TipoBloqueComponentes.
 */
@Entity
@Table(name = "tipo_bloque_componentes")
public class TipoBloqueComponentes implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The id. */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/** The nombre. */
	@Column(name = "nombre_bloque_componentes")
    private String nombre;
	
	/** The icon path. */
	@Column(name = "icon_path")
    private String iconPath;
	
	/** The tags. */
	@Column(name = "tags")
    private String tags;
	
	/** The tipos componentes. */
	
	
	@OneToMany(mappedBy="tipoBloqueComponentes", fetch = FetchType.EAGER ,cascade = CascadeType.ALL)
	@OrderBy ("orden ASC")

	private Set<TiposBloquesComponentes> tiposBloquesComponentes  = new HashSet<>();
	
	/** The bloque componentes. */
	@JsonIgnore
	@OneToMany(mappedBy="tipoBloqueComponentes")
	private Set<BloqueComponentes> bloqueComponentes = new HashSet<>();


	/**
	 * Gets the id.
	 *
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Sets the id.
	 *
	 * @param id the new id
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the nombre bloque componentes.
	 *
	 * @return the nombre bloque componentes
	 */
	public String getNombre() {
		return nombre;
	}

	/**
	 * Sets the nombre bloque componentes.
	 *
	 * @param nombre the new nombre bloque componentes
	 */
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	/**
	 * Gets the icon path.
	 *
	 * @return the icon path
	 */
	public String getIconPath() {
		return iconPath;
	}
	
	
	/**
	 * @return the tiposBloquesComponentes
	 */
	public Set<TiposBloquesComponentes> getTiposBloquesComponentes() {
		return tiposBloquesComponentes;
	}

	/**
	 * @param tiposBloquesComponentes the tiposBloquesComponentes to set
	 */
	public void setTiposBloquesComponentes(Set<TiposBloquesComponentes> tiposBloquesComponentes) {
		this.tiposBloquesComponentes = tiposBloquesComponentes;
	}

	/**
	 * Sets the icon path.
	 *
	 * @param iconPath the new icon path
	 */
	public void setIconPath(String iconPath) {
		this.iconPath = iconPath;
	}

	/**
	 * Gets the tags.
	 *
	 * @return the tags
	 */
	public String getTags() {
		return tags;
	}

	/**
	 * Sets the tags.
	 *
	 * @param tags the new tags
	 */
	public void setTags(String tags) {
		this.tags = tags;
	}
	


	/**
	 * Gets the bloque componentes.
	 *
	 * @return the bloque componentes
	 */
	public Set<BloqueComponentes> getBloqueComponentes() {
		return bloqueComponentes;
	}
	

	@Override
	public String toString() {
		return "TipoBloqueComponentes [id=" + id + ", nombre=" + nombre + ", iconPath=" + iconPath + ", tags=" + tags
				+ ", tiposBloquesComponentes=" + tiposBloquesComponentes + "]";
	}
	
}
