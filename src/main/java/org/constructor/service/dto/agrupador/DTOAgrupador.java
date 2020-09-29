package org.constructor.service.dto.agrupador;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

import org.constructor.domain.User;
import org.constructor.domain.agrupador.Etiqueta;

public class DTOAgrupador {
	
	
	private Long id;
	
	
    private String titulo;
    
   
    private String descripcion;
    
   
    private int duracion;
    
   
    private LocalDateTime fechaInicio;
    
    
    private LocalDateTime fechaFin;
     
    
    private Set<Etiqueta> etiquetas = new HashSet<>();
    
    private Set<AgrupadorModuloDTO> modulos = new HashSet<>();
    
    private Set<User> user = new HashSet<>();

	/**
	 * @return the id
	 */
	public Long getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * @return the titulo
	 */
	public String getTitulo() {
		return titulo;
	}

	/**
	 * @param titulo the titulo to set
	 */
	public void setTitulo(String titulo) {
		this.titulo = titulo;
	}

	/**
	 * @return the descripcion
	 */
	public String getDescripcion() {
		return descripcion;
	}

	/**
	 * @param descripcion the descripcion to set
	 */
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}

	/**
	 * @return the duracion
	 */
	public int getDuracion() {
		return duracion;
	}

	/**
	 * @param duracion the duracion to set
	 */
	public void setDuracion(int duracion) {
		this.duracion = duracion;
	}

	/**
	 * @return the fechaInicio
	 */
	public LocalDateTime getFechaInicio() {
		return fechaInicio;
	}

	/**
	 * @param fechaInicio the fechaInicio to set
	 */
	public void setFechaInicio(LocalDateTime fechaInicio) {
		this.fechaInicio = fechaInicio;
	}

	/**
	 * @return the fechaFin
	 */
	public LocalDateTime getFechaFin() {
		return fechaFin;
	}

	/**
	 * @param fechaFin the fechaFin to set
	 */
	public void setFechaFin(LocalDateTime fechaFin) {
		this.fechaFin = fechaFin;
	}

	/**
	 * @return the etiquetas
	 */
	public Set<Etiqueta> getEtiquetas() {
		return etiquetas;
	}

	/**
	 * @param etiquetas the etiquetas to set
	 */
	public void setEtiquetas(Set<Etiqueta> etiquetas) {
		this.etiquetas = etiquetas;
	}

	/**
	 * @return the modulos
	 */
	public Set<AgrupadorModuloDTO> getModulos() {
		return modulos;
	}

	/**
	 * @param modulos the modulos to set
	 */
	public void setModulos(Set<AgrupadorModuloDTO> modulos) {
		this.modulos = modulos;
	}

	/**
	 * @return the user
	 */
	public Set<User> getUser() {
		return user;
	}

	/**
	 * @param user the user to set
	 */
	public void setUser(Set<User> user) {
		this.user = user;
	}

	/**
	 * To string.
	 *
	 * @return the string
	 */
	@Override
	public String toString() {
		return "DTOAgrupador [id=" + id + ", titulo=" + titulo + ", descripcion=" + descripcion + ", duracion="
				+ duracion + ", fechaInicio=" + fechaInicio + ", fechaFin=" + fechaFin + ", etiquetas=" + etiquetas
				+ ", modulos=" + modulos + ", user=" + user + "]";
	}

}
