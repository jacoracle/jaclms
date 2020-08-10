/**
 * 
 */
package org.constructor.module.domain;

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
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import org.constructor.domain.Asignatura;
import org.constructor.domain.NumeroGrado;
import org.constructor.domain.RolesColaboradores;
import org.constructor.domain.User;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "modulo")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Modulo implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 8842725359899046339L;

	
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
     * tipoModulo
     */
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "tipos_modulos_modulo", 
            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="tipo_modulo_id", referencedColumnName = "id", nullable = false))
	private Set<TipoModulo> tiposModulos  ;
    
    /**
     * asignatura
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private Asignatura asignatura;
 
    

    /**
     * numeroGrado
     */
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "numero_grado_modulo", 
            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="numero_grado_id", referencedColumnName = "id", nullable = false))
	private Set<NumeroGrado>  numeroGrados  ;
 
    
    /**
     * temas
     */
	@ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "temas_modulo", 
            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="temas_id", referencedColumnName = "id", nullable = false))
	private Set<Temas>  temas  ;
    
    /**
     * colaborador
     */
	  @ManyToMany(fetch = FetchType.EAGER)
	    @JoinTable(
	            name = "colaboradores_modulo", 
	            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
	            inverseJoinColumns = @JoinColumn(name="roles_colaboradores_id", referencedColumnName = "id", nullable = false))
	    private Set<RolesColaboradores> rolesColaboradores ;
    

    
    /**
     * LocalDate fechaCreacionSys
     */
    @Column(name = "fecha_creacion_sys")
    private LocalDateTime fechaCreacionSys;

    /**
     * nivelesCurso
     */
    @OneToOne(mappedBy = "modulo", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private NivelesModulo nivelesModulo;
    
    /**
     * user
     */
    @JsonIgnore
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
            name = "modulo_usuario", 
            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="usuario_id", referencedColumnName = "id", nullable = false))
    private Set<User> user = new HashSet<>();
    
    @JsonIgnore
    @OneToMany(mappedBy = "modulo", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<AgrupadorModulo> agrupador;

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
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * Get
	 * @return the tiposModulos
	 */
	public Set<TipoModulo> getTiposModulos() {
		return tiposModulos;
	}


	/**
	 * Set
	 * @param tiposModulos the tiposModulos to set
	 */
	public void setTiposModulos(final Set<TipoModulo> tiposModulos) {
		this.tiposModulos = tiposModulos;
	}


	/**
	 * Get
	 * @return the temas
	 */
	public Set<Temas> getTemas() {
		return temas;
	}


	/**
	 * @param temas the temas to set
	 */
	public void setTemas(final Set<Temas> temas) {
		this.temas = temas;
	}


	/**
	 * Set
	 * @param titulo the titulo to set
	 */
	public void setTitulo(final String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Set
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}


	/**
	 * Get
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(final String descripcion) {
		this.descripcion = descripcion;
	}


	/**
	 * Get
	 * @return the asignatura
	 */
	public Asignatura getAsignatura() {
		return asignatura;
	}


	/**
	 * Set
	 * @param asignatura the asignatura to set
	 */
	public void setAsignatura(final Asignatura asignatura) {
		this.asignatura = asignatura;
	}


	


	/**
	 * @return the numeroGrados
	 */
	public Set<NumeroGrado> getNumeroGrados() {
		return numeroGrados;
	}


	/**
	 * @param numeroGrados the numeroGrados to set
	 */
	public void setNumeroGrados(Set<NumeroGrado> numeroGrados) {
		this.numeroGrados = numeroGrados;
	}


	/**
	 * Get
	 * @return the rolesColaboradores
	 */
	public Set<RolesColaboradores> getRolesColaboradores() {
		return rolesColaboradores;
	}


	/**
	 * Set
	 * @param rolesColaboradores the rolesColaboradores to set
	 */
	public void setRolesColaboradores(final Set<RolesColaboradores> rolesColaboradores) {
		this.rolesColaboradores = rolesColaboradores;
	}


	/**
	 * Get
	 * @return the user
	 */
	public Set<User> getUser() {
		return user;
	}


	/**
	 * Set
	 * @param user the user to set
	 */
	public void setUser(Set<User> user) {
		this.user = user;
	}


	/**
	 * Get
	 * @return the fechaCreacionSys
	 */
	public LocalDateTime getFechaCreacionSys() {
		return fechaCreacionSys;
	}

	 /**
     * Modulo
     * @param fechaCreacionSys
     * @return
     */
    public Modulo fechaCreacionSys(LocalDateTime fechaCreacionSys) {
        this.fechaCreacionSys = LocalDateTime.now();;
        return this;
    }

	/**
	 * Set
	 * @param fechaCreacionSys the fechaCreacionSys to set
	 */
	public void setFechaCreacionSys(final LocalDateTime fechaCreacionSys) {
		  this.fechaCreacionSys = LocalDateTime.now();;
	}
	

	/**
	 * @return the nivelesModulo
	 */
	public NivelesModulo getNivelesModulo() {
		return nivelesModulo;
	}


	/**
	 * @param nivelesModulo the nivelesModulo to set
	 */
	public void setNivelesModulo(NivelesModulo nivelesModulo) {
		this.nivelesModulo = nivelesModulo;
	}


	/**
	 * @return the agrupador
	 */
	public Set<AgrupadorModulo> getAgrupador() {
		return agrupador;
	}


	/**
	 * @param agrupador the agrupador to set
	 */
	public void setAgrupador(Set<AgrupadorModulo> agrupador) {
		this.agrupador = agrupador;
	}


	/**
	 * equals
	 */
	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Modulo)) {
            return false;
        }
        return id != null && id.equals(((Modulo) o).id);
    }

	/**
	 * ToString
	 */
	@Override
	public String toString() {
		return "Modulo [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", tiposModulos="
				+ tiposModulos + ", asignatura=" + asignatura + ", numeroGrados=" + numeroGrados + ", temas=" + temas
				+ ", rolesColaboradores=" + rolesColaboradores + ", user=" + user + ", fechaCreacionSys="
				+ fechaCreacionSys + "]";
	}

    
}
