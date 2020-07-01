/**
 * 
 */
package org.constructor.domain;

import java.io.Serializable;
import java.util.Objects;

import javax.persistence.Column;

/**
 * @author Edukai
 *
 */
public class TiposBloquesComponentesId implements Serializable {

    /**
	 * Serializable
	 */
	private static final long serialVersionUID = 1L;

	/**
	 * tipo_bloque_componentes_id
	 */
	@Column(name = "tipo_bloque_componentes_id")
    private Long tipo_bloque_componentes_id;

	/**
	 * tipo_componente_id
	 */
    @Column(name = "tipo_componente_id")
    private Long tipo_componente_id;

    /**
     * Empty Constructor
     */
    public TiposBloquesComponentesId() {
    	//Default constructor
    }

    /**
     * Constructor 
     * @param tipo_bloque_componentes_id
     * @param tipo_componente_id
     */
    public TiposBloquesComponentesId(final Long tipo_bloque_componentes_id,final  Long tipo_componente_id) {
        this.tipo_bloque_componentes_id = tipo_bloque_componentes_id;
        this.tipo_componente_id = tipo_componente_id;
    }

    /**
     * Get
	 * @return the tipo_bloque_componentes_id
	 */
	public Long getTipo_bloque_componentes_id() {
		return tipo_bloque_componentes_id;
	}

	/**
	 * Get
	 * @return the tipo_componente_id
	 */
	public Long getTipo_componente_id() {
		return tipo_componente_id;
	}

	/**
	 * EmployeeId
	 */
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof TiposBloquesComponentesId)) return false;
        TiposBloquesComponentesId that = (TiposBloquesComponentesId) o;
        return Objects.equals(getTipo_bloque_componentes_id(), that.getTipo_bloque_componentes_id()) &&
                Objects.equals(getTipo_componente_id(), that.getTipo_componente_id());
    }

    /**
     * hashCode
     */
    @Override
    public int hashCode() {
        return Objects.hash(getTipo_bloque_componentes_id(), getTipo_componente_id());
    }
}


