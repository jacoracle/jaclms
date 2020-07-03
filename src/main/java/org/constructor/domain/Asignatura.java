package org.constructor.domain;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Asignatura.
 */
@Entity
@Table(name = "asignatura")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Asignatura implements Serializable {

	/**
	 * Serializable
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
     * Set Curso
     */
    @OneToMany(mappedBy = "asignatura")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Curso> cursos = new HashSet<>();

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
     * @return descripcion
     */
    public String getDescripcion() {
        return descripcion;
    }

    /**
     * 
     *Asignatura descripcion
     * 
     * @param descripcion
     * @return
     */
    public Asignatura descripcion(String descripcion) {
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
     *cursos 
     * @return the cursos
     */
    public Set<Curso> getCursos() {
        return cursos;
    }

    /**
     * Asignatura cursos
     * 
     * @param cursos
     * @return the this 
     */
    public Asignatura cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    /**
     * Asignatura addCurso
     * 
     * @param curso
     * @return the this
     */
    public Asignatura addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.setAsignatura(this);
        return this;
    }

    /**
     * Asignatura removeCurso
     * 
     * @param curso
     * @return the this 
     */
    public Asignatura removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.setAsignatura(null);
        return this;
    }

    /**
     * Set
     * @param cursos
     */
    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Asignatura)) {
            return false;
        }
        return id != null && id.equals(((Asignatura) o).id);
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
        return "Asignatura{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
