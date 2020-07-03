/**
 * 
 */
package org.constructor.domain;

import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

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
     * tipoModulo
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private TipoModulo tipoModulo;
    
    /**
     * asignatura
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private Asignatura asignatura;
    
    /**
     * numeroGrado
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private NumeroGrado numeroGrado;
    
    /**
     * temas
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private Temas temas;
    
    /**
     * colaborador_id
     */
    @ManyToOne
    @JsonIgnoreProperties("modulos")
    private Colaborador colaborador;
    
    /**
     * user
     */
    @JsonIgnore
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(
            name = "modulo_usuario", 
            joinColumns = @JoinColumn(name = "modulo_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="usuario_id", referencedColumnName = "id", nullable = false))
    private Set<User> user = new HashSet<>();
    
    
    /**
     * LocalDate fechaCreacionSys
     */
    @Column(name = "fecha_creacion_sys")
    private LocalDateTime fechaCreacionSys;


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
	 * @return the tipoModulo
	 */
	public TipoModulo getTipoModulo() {
		return tipoModulo;
	}


	/**
	 * Set
	 * @param tipoModulo the tipoModulo to set
	 */
	public void setTipoModulo(final TipoModulo tipoModulo) {
		this.tipoModulo = tipoModulo;
	}


	/**
	 * Get
	 * @return the temas
	 */
	public Temas getTemas() {
		return temas;
	}


	/**
	 * Set
	 * @param temas the temas to set
	 */
	public void setTemas(final Temas temas) {
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
	 * Get
	 * @return the numeroGrado
	 */
	public NumeroGrado getNumeroGrado() {
		return numeroGrado;
	}


	/**
	 * Set
	 * @param numeroGrado the numeroGrado to set
	 */
	public void setNumeroGrado(final NumeroGrado numeroGrado) {
		this.numeroGrado = numeroGrado;
	}


	/**
	 * Get
	 * @return the colaborador
	 */
	public Colaborador getColaborador() {
		return colaborador;
	}


	/**
	 * Set
	 * @param colaborador the colaborador to set
	 */
	public void setColaborador(final Colaborador colaborador) {
		this.colaborador = colaborador;
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
	public void setUser(final Set<User> user) {
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
     * Curso
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
    
    
    
    
}
