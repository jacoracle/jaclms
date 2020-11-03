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

import org.constructor.domain.NumeroGrado;
import org.constructor.domain.RolesColaboradores;
import org.constructor.domain.User;
import org.constructor.domain.module.Temas;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * @author Edukai
 *
 */
@Entity
@Table(name = "rutas_aprendizaje")
public class RutasAprendizaje implements Serializable {

	/**
	 * Serializable
	 */
	private static final long serialVersionUID = 2143428899012978484L;

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
	 * String portadaUrl
	 */
	@Column(name = "portada_url")
	private String portadaUrl;

	/**
	 * areaDeConocimiento
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "numero_grado_ruta", joinColumns = @JoinColumn(name = "ruta_id", referencedColumnName = "id", nullable = false), inverseJoinColumns = @JoinColumn(name = "numero_grado_id", referencedColumnName = "id", nullable = false))
	private Set<NumeroGrado> nivelAcademico;

	/**
	 * temas
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "temas_ruta", joinColumns = @JoinColumn(name = "ruta_id", referencedColumnName = "id", nullable = false), inverseJoinColumns = @JoinColumn(name = "temas_id", referencedColumnName = "id", nullable = false))
	private Set<Temas> temas;

	/**
	 * colaborador
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "colaboradores_ruta", joinColumns = @JoinColumn(name = "ruta_id", referencedColumnName = "id", nullable = false), inverseJoinColumns = @JoinColumn(name = "roles_colaboradores_id", referencedColumnName = "id", nullable = false))
	private Set<RolesColaboradores> rolesColaboradores;

	/**
	 * NivelRuta
	 */

	@OneToMany(mappedBy = "rutasAprendizaje", fetch = FetchType.EAGER, cascade = CascadeType.REMOVE)
	private Set<NivelRuta> nivelRutas;

	/**
	 * user
	 */
	@JsonIgnore
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "ruta_usuario", joinColumns = @JoinColumn(name = "ruta_id", referencedColumnName = "id", nullable = false), inverseJoinColumns = @JoinColumn(name = "usuario_id", referencedColumnName = "id", nullable = false))
	private Set<User> user = new HashSet<>();

	/**
	 * Get
	 * 
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * Set
	 * 
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
	 * Set
	 * @param titulo the titulo to set
	 */
	public void setTitulo(final String titulo) {
		this.titulo = titulo;
	}

	/**
	 * Get
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * Set
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(final String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * Get
	 * @return the portadaUrl
	 */
	public String getPortadaUrl() {
		return portadaUrl;
	}

	/**
	 * Set
	 * @param portadaUrl the portadaUrl to set
	 */
	public void setPortadaUrl(final String portadaUrl) {
		this.portadaUrl = portadaUrl;
	}

	/**
	 * Get
	 * @return the nivelAcademico
	 */
	public Set<NumeroGrado> getNivelAcademico() {
		return nivelAcademico;
	}

	/**
	 * Set
	 * @param nivelAcademico the nivelAcademico to set
	 */
	public void setNivelAcademico(final Set<NumeroGrado> nivelAcademico) {
		this.nivelAcademico = nivelAcademico;
	}

	/**
	 * Get
	 * @return the temas
	 */
	public Set<Temas> getTemas() {
		return temas;
	}

	/**
	 * Set
	 * @param temas the temas to set
	 */
	public void setTemas(final Set<Temas> temas) {
		this.temas = temas;
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
	public void setUser(final Set<User> user) {
		this.user = user;
	}

	/**
	 * Get
	 * 
	 * @return the nivelRutas
	 */
	public Set<NivelRuta> getNivelRutas() {
		return nivelRutas;
	}

	/**
	 * Set
	 * 
	 * @param nivelRutas the nivelRutas to set
	 */
	public void setNivelRutas(final Set<NivelRuta> nivelRutas) {
		this.nivelRutas = nivelRutas;
	}

	@Override
	public String toString() {
		return "RutasAprendizaje [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", portadaUrl="
				+ portadaUrl + ", nivelAcademico=" + nivelAcademico + ", temas=" + temas + ", rolesColaboradores="
				+ rolesColaboradores + ", nivelRutas=" + nivelRutas + ", user=" + user + "]";
	}

	
}
