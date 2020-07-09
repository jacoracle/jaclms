package org.constructor.domain;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

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
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tipos_bloques_componentes", 
            joinColumns = @JoinColumn(name = "tipo_bloque_componentes_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="tipo_componente_id", referencedColumnName = "id", nullable = false))
	private Set<TipoComponente> tiposComponentes;
	
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
	 * Gets the tipos componentes.
	 *
	 * @return the tipos componentes
	 */
	public Set<TipoComponente> getTiposComponentes() {
		return tiposComponentes;
	}

	/**
	 * Sets the tipos componentes.
	 *
	 * @param tiposComponentes the new tipos componentes
	 */
	public void setTiposComponentes(Set<TipoComponente> tiposComponentes) {
		this.tiposComponentes = tiposComponentes;
	}

	/**
	 * Gets the bloque componentes.
	 *
	 * @return the bloque componentes
	 */
	public Set<BloqueComponentes> getBloqueComponentes() {
		return bloqueComponentes;
	}

	/**
	 * Sets the bloque componentes.
	 *
	 * @param bloqueComponentes the new bloque componentes
	 */
	public void setBloqueComponentes(Set<BloqueComponentes> bloqueComponentes) {
		this.bloqueComponentes = bloqueComponentes;
	}

	@Override
	public String toString() {
		return "TipoBloqueComponentes [id=" + id + ", nombre=" + nombre + ", iconPath=" + iconPath + ", tags=" + tags
				+ ", tiposComponentes=" + tiposComponentes + "]";
	}
	
}
