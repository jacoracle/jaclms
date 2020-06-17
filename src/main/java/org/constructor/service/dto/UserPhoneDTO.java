package org.constructor.service.dto;

import java.util.Set;

import org.constructor.domain.Telefono;
import org.constructor.domain.User;

public class UserPhoneDTO {
	
	/**
	 * User
	 */
	private User user;
	
	/**
	 * phoneNumbers
	 */
	private Set<Telefono>telefonos;
	
	/**
	 * Get
	 * @return the user 
	 */
	public User getUser() {
		return user;
	}
	
	/**
	 * Set
	 * @param user
	 */
	public void setUser(final User user) {
		this.user = user;
	}
	
	/**
	 * @return the telefonos
	 */
	public Set<Telefono> getTelefonos() {
		return telefonos;
	}

	/**
	 * @param telefonos the telefonos to set
	 */
	public void setTelefonos(Set<Telefono> telefonos) {
		this.telefonos = telefonos;
	}

	/**
	 * toString
	 */
	@Override
	public String toString() { 
		return "UserPhoneDTO [user=" + user + ", telefonos=" + telefonos + "]";
	}
	
	
	
}
