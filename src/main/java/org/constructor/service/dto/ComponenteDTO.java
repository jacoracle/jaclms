package org.constructor.service.dto;

import java.util.Set;

import org.constructor.domain.TipoComponente;

/**
 * The Class ComponenteDTO.
 */
public class ComponenteDTO {
	
	/** The id. */
	private Long id;
	
	/** The tipo componente. */
	private TipoComponente tipoComponente;
	
	
	/** The version. */
	private Long version;
	
	/** The orden. */
	private Long orden;
	
	/** The contenido. */
	private ContenidoDTO contenido;
	
	private Set<ActividadInteractivaDTO>  actividadesInteractivas;
 
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
	 * @param id the id to set
	 */
	public void setId(Long id) {
		this.id = id;
	}

	/**
	 * Gets the tipo componente.
	 *
	 * @return the tipo componente
	 */
	public TipoComponente getTipoComponente() {
		return tipoComponente;
	}

	/**
	 * Sets the tipo componente.
	 *
	 * @param tipoComponente the new tipo componente
	 */
	public void setTipoComponente(TipoComponente tipoComponente) {
		this.tipoComponente = tipoComponente;
	}

	/**
	 * Gets the version.
	 *
	 * @return the version
	 */
	public Long getVersion() {
		return version;
	}

	/**
	 * Sets the version.
	 *
	 * @param version the new version
	 */
	public void setVersion(Long version) {
		this.version = version;
	}

	/**
	 * @return the orden
	 */
	public Long getOrden() {
		return orden;
	}

	/**
	 * @param orden the orden to set
	 */
	public void setOrden(Long orden) {
		this.orden = orden;
	}
	

	/**
	 * @return the contenido
	 */
	public ContenidoDTO getContenido() {
		return contenido;
	}

	/**
	 * @param contenido the contenido to set
	 */
	public void setContenido(ContenidoDTO contenido) {
		this.contenido = contenido;
	}

	

	/**
	 * @return the actividadesInteractivas
	 */
	public Set<ActividadInteractivaDTO> getActividadesInteractivas() {
		return actividadesInteractivas;
	}

	/**
	 * @param actividadesInteractivas the actividadesInteractivas to set
	 */
	public void setActividadesInteractivas(Set<ActividadInteractivaDTO> actividadesInteractivas) {
		this.actividadesInteractivas = actividadesInteractivas;
	}

	@Override
	public String toString() {
		return "ComponenteDTO [id=" + id + ", tipoComponente=" + tipoComponente + ", version=" + version + ", orden="
				+ orden + ", contenido=" + contenido + ", actividadesInteractivas=" + actividadesInteractivas + "]";
	}


	
}
