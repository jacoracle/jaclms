package org.constructor.domain;

import java.io.Serializable;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.OrderBy;
import javax.persistence.Table;

import org.constructor.interactive.domain.ActividadInteractiva;

import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: Auto-generated Javadoc
/**
 * A Componente.
 */
@Entity
@Table(name = "componente")
public class Componente implements Serializable {
	
	/** Serializable. */
	private static final long serialVersionUID = 1L;
	
	/** Long Id. */
	@Id
	@OrderBy(value = "id ASC")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
		
	/** Long Version. */
	@Column(name = "version")
    private Long version;
	
	/** The orden. */
	@Column(name = "orden")
    private Long orden;
	
	/** tipoComponente. */
	
	@ManyToOne
    @JoinColumn(name = "tipo_componente_id", nullable=false)
    private TipoComponente tipoComponente;
	
	/** bloqueComponentes. */
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "bloque_componentes_id", nullable=false)
    private BloqueComponentes bloqueComponentes; 
	
	/** The contenido. */
	@OneToOne(mappedBy = "componente", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Contenido contenido;

	/**
	 * actividadInteractiva
	 */
	
    @OneToMany(mappedBy = "componente", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<ActividadInteractiva>  actividadesInteractivas;
	
	/**
	 * Get.
	 *
	 * @return id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set.
	 *
	 * @param id the new id
	 */
	public void setId(final Long id) {
		this.id = id;
	}

	/**
	 * Get.
	 *
	 * @return version
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * Set .
	 *
	 * @param version the new version
	 */
	public void setVersion(final Long version) {
		this.version = version;
	}

	/**
	 * Get.
	 *
	 * @return tipoComponente
	 */
	public TipoComponente getTipoComponente() {
		return tipoComponente;
	}
	
	/**
	 * Set .
	 *
	 * @param tipoComponente the new tipo componente
	 */
	public void setTipoComponente(final TipoComponente tipoComponente) {
		this.tipoComponente = tipoComponente;
	}

	/**
	 * Get .
	 *
	 * @return bloqueComponentes
	 */
	public BloqueComponentes getBloqueComponentes() {
		return bloqueComponentes;
	}
	
	/**
	 * Set .
	 *
	 * @param bloqueComponentes the new bloque componentes
	 */
	public void setBloqueComponentes(final BloqueComponentes bloqueComponentes) {
		this.bloqueComponentes = bloqueComponentes;
	}
	

	/**
	 * Gets the orden.
	 *
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}

	/**
	 * Sets the orden.
	 *
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}
	
	/**
	 * Gets the contenido.
	 *
	 * @return the contenido
	 */
	public Contenido getContenido() {
		return contenido;
	}

	/**
	 * Sets the contenido.
	 *
	 * @param contenido the contenido to set
	 */
	public void setContenido(Contenido contenido) {
		this.contenido = contenido;
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

	/**
	 * ToString
	 */
	@Override
	public String toString() {
		return "Componente [id=" + id + ", version=" + version + ", orden=" + orden + ", tipoComponente="
				+ tipoComponente + ", bloqueComponentes=" + bloqueComponentes + ", contenido=" + contenido
				+ ", actividadInteractivas=" + actividadesInteractivas + "]";
	}



	

	
}
