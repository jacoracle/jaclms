package org.constructor.domain;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * A PhoneNumber.
 */
@Entity
@Table(name = "telefono")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Telefono implements Serializable {
	
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
	 * User user
	 */
	@JsonIgnore
	@ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
	
	/**
	 * Country country
	 */
	@ManyToOne
    @JoinColumn(name = "pais_id")
    private Pais pais;
	
	/**
	 * Long phoneNumbe
	 */
	@Column(name = "telefono")
    private Long telefono;
	

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
	 * @return the user
	 */
	public User getUser() {
		return user;
	}
	
	/**
	 * user
	 * @param user
	 * @return the this 
	 */
	public Telefono user(User user) {
        this.user = user;
        return this;
    }


	/**
	 * Set
	 * @param user
	 */
	public void setUser(User user) {
		this.user = user;
	}
	
	/**
	 * Get
	 * @return the country
	 */
	public Pais getPais() {
		return pais;
	}
	
	/**
	 * country
	 * @param country
	 * @return the this
	 */
	public Telefono country(Pais pais) {
        this.pais = pais;
        return this;
    }

	/**
	 * Set
	 * @param country
	 */
	public void setPais(Pais pais) {
		this.pais = pais;
	}

	/**
	 * Get
	 * @return the phoneNumber
	 */
	public Long getTelefono() {
		return telefono;
	}

	/**
	 * Set
	 * @param phoneNumber
	 */
	public void setTelefono(Long telefono) {
		this.telefono = telefono;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() {
		return "PhoneNumber [id=" + id + ", pais=" + pais + ", telefono=" + telefono + "]";
	}


	
}
