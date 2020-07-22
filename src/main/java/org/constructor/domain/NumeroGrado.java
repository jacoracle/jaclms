package org.constructor.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A NumeroGrado.
 */
@Entity
@Table(name = "numero_grado")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class NumeroGrado implements Serializable {

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
     * numeroGrado
     */
    @OneToMany(mappedBy = "numeroGrado")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JsonIgnore
    private Set<Curso> cursos = new HashSet<>();

    /**
     * numeroGrados
     */
    @ManyToOne
    @JsonIgnoreProperties("numeroGrados")
    private GradoAcademico gradoAcademico;

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
     *  NumeroGrado descripcio
     * @param descripcion
     * @return the this
     */
    public NumeroGrado descripcion(String descripcion) {
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
     * @return the cursos
     */
    public Set<Curso> getCursos() {
        return cursos;
    }

    /**
     * NumeroGrado cursos
     * @param cursos
     * @return the this 
     */
    public NumeroGrado cursos(Set<Curso> cursos) {
        this.cursos = cursos;
        return this;
    }

    /**
     * addCurso
     * @param curso
     * @return the this 
     */
    public NumeroGrado addCurso(Curso curso) {
        this.cursos.add(curso);
        curso.setNumeroGrado(this);
        return this;
    }

    /**
     * removeCurso
     * @param curso
     * @return the this 
     */
    public NumeroGrado removeCurso(Curso curso) {
        this.cursos.remove(curso);
        curso.setNumeroGrado(null);
        return this;
    }

    /**
     * Set
     * @param cursos
     */
    public void setCursos(Set<Curso> cursos) {
        this.cursos = cursos;
    }

    /**
     * Get 
     * @return the gradoAcademico
     */
    public GradoAcademico getGradoAcademico() {
        return gradoAcademico;
    }

    /**
     * gradoAcademico
     * @param gradoAcademico
     * @return the this
     */
    public NumeroGrado gradoAcademico(GradoAcademico gradoAcademico) {
        this.gradoAcademico = gradoAcademico;
        return this;
    }

    /**
     * Set
     * @param gradoAcademico
     */
    public void setGradoAcademico(GradoAcademico gradoAcademico) {
        this.gradoAcademico = gradoAcademico;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    /**
     * equals
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof NumeroGrado)) {
            return false;
        }
        return id != null && id.equals(((NumeroGrado) o).id);
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
        return "NumeroGrado{" +
            "id=" + getId() +
            ", descripcion='" + getDescripcion() + "'" +
            "}";
    }
}
