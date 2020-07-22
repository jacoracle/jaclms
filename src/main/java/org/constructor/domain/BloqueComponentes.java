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
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

// TODO: Auto-generated Javadoc
/**
 * A BloqueComponentes.
 */
@Entity
@Table(name = "bloque_componentes")
public class BloqueComponentes implements Serializable {
	
	/** The Constant serialVersionUID. */
	private static final long serialVersionUID = 1L;
	
	/** The id. */
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
	
	/** The orden componente. */
	@Column(name = "orden")
    private int orden;
	
	/** The componente. */
	@OneToMany(mappedBy="bloqueComponentes", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private Set<Componente> componente = new HashSet<>();
		
	/** The tipo bloque componentes. */
	@ManyToOne
    @JoinColumn(name = "tipo_bloque_componentes_id", nullable=false)
    private TipoBloqueComponentes tipoBloqueComponentes;

	
	/** The bloques curso. */
	@OneToMany(mappedBy="bloqueComponentes", cascade = CascadeType.ALL)
	@JsonIgnore
	private Set<BloquesCurso> bloquesCurso;
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
	 * Gets the orden componente.
	 *
	 * @return the orden componente
	 */
	public int getOrden() {
		return orden;
	}

	/**
	 * Sets the orden componente.
	 *
	 * @param orden the new orden
	 */
	public void setOrden(int orden) {
		this.orden = orden;
	}

	/**
	 * Gets the componente.
	 *
	 * @return the componente
	 */
	public Set<Componente> getComponentes() {
		return componente;
	}

	/**
	 * Sets the componente.
	 *
	 * @param componente the new componente
	 */
	public void setComponente(Set<Componente> componente) {
		this.componente = componente;
	}

	/**
	 * Gets the tipo bloque componentes.
	 *
	 * @return the tipo bloque componentes
	 */
	public TipoBloqueComponentes getTipoBloqueComponentes() {
		return tipoBloqueComponentes;
	}

	/**
	 * Sets the tipo bloque componentes.
	 *
	 * @param tipoBloqueComponentes the new tipo bloque componentes
	 */
	public void setTipoBloqueComponentes(TipoBloqueComponentes tipoBloqueComponentes) {
		this.tipoBloqueComponentes = tipoBloqueComponentes;
	}

	/**
	 * @return the bloquesCurso
	 */
	public Set<BloquesCurso> getBloquesCurso() {
		return bloquesCurso;
	}

	/**
	 * @param bloquesCurso the bloquesCurso to set
	 */
	public void setBloquesCurso(Set<BloquesCurso> bloquesCurso) {
		this.bloquesCurso = bloquesCurso;
	}


	
}
