package org.constructor.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

/**
 * A Ficha.
 */
@Entity
@Table(name = "ficha")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ficha implements Serializable {

	/**
	 *Serializable 
	 */
    private static final long serialVersionUID = 1L;

    /**
     * Long id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * String descripcion
     */
    @Column(name = "descripcion")
    private String descripcion;

    /**
     * LocalDate fechaCreacion
     */
    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion;

    /**
     * Curso curso 
     */
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "curso_id")
    @JsonIgnore
    private Curso curso;

    
    /**
     * Ficha puede tener muchos RolesColaboradores (JAM)
     */
    @ManyToMany
    @JoinTable(
            name = "creditos_editoriales", 
            joinColumns = @JoinColumn(name = "ficha_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="roles_colaboradores_id", referencedColumnName = "id", nullable = false))
    private Set<RolesColaboradores> creditosEditoriales = new HashSet<>();

    /**
     * Editorial editorial
     */
    @ManyToOne
    @JsonIgnoreProperties("fichas")
    private Editorial editorial;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    
    /**
     * Get
     * @return the id 
     */
    public Long getId() {
        return id;
    }

    /**
     * Set
     * @param id
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     * Get
     * @return the descripcion
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * Ficha descripcion
     * @param descripcion
     * @return the this 
     */
    public Ficha descripcion(String descripcion) {
        this.descripcion = descripcion;
        return this;
    }

    /**
     * Set
     * @param descripcion
     */
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    /**
     * Get
     * @return the fechaCreacion
     */
    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    /**
     * Ficha fechaCreacion
     * @param fechaCreacion
     * @return the this 
     */
    public Ficha fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    /**
     * Set
     * @param fechaCreacion
     */
    public void setFechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
    }

    /**
     * Get 
     * @return the curso 
     */
    public Curso getCurso() {
        return curso;
    }

    /**
     *Ficha curso  
     * @param curso
     * @return the this 
     */
    public Ficha curso(Curso curso) {
        this.curso = curso;
        return this;
    }

    /**
     * Set
     * @param curso
     */
    public void setCurso(Curso curso) {
        this.curso = curso;
    }


    /**
     * Get 
     * @return the editorial 
     */
    public Editorial getEditorial() {
        return editorial;
    }

    /**
     * Ficha editorial 
     * @param editorial
     * @return the this 
     */
    public Ficha editorial(Editorial editorial) {
        this.editorial = editorial;
        return this;
    }

    /**
     * Set
     * @param editorial
     */
    public void setEditorial(Editorial editorial) {
        this.editorial = editorial;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove
    
    /**
     * Get
     * @return the creditosEditoriales 
     */
    public Set<RolesColaboradores> getCreditosEditoriales() {
		return creditosEditoriales;
	}

    /**
     * Set
     * @param creditosEditoriales
     */
	public void setCreditosEditoriales(Set<RolesColaboradores> creditosEditoriales) {
		this.creditosEditoriales = creditosEditoriales;
	}

	/**
	 * equals
	 */
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ficha)) {
            return false;
        }
        return id != null && id.equals(((Ficha) o).id);
    }


    /**
     * hashCode
     */
	@Override
    public int hashCode() {
        return 31;
    }

	/**
	 * toString
	 */
    @Override
    public String toString() {
        return "Ficha{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            "}";
    }
}