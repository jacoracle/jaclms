package org.constructor.service.dto;

import org.constructor.config.Constants;

import org.constructor.domain.Authority;
import org.constructor.domain.Telefono;
import org.constructor.domain.User;

import javax.validation.constraints.*;
import java.time.Instant;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * A DTO representing a user, with his authorities.
 */
public class UserDTO {

	/**
	 * Long id 
	 */
    private Long id;

    /**
     * String login
     */
    @NotBlank
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    private String login;

    
    /**
     * String firstName
     */
    @Size(max = 50)
    private String firstName;

    /**
     * String lastName1
     */
    @Size(max = 50)
    private String lastName1;
    
    /**
     * String lastName2
     */
    @Size(max = 50)
    private String lastName2;
    
   
    /**
     * phone
     */
    private Set<Telefono> telefono;

    /**
     * String email
     */
    @Email
    @Size(min = 5, max = 254)
    private String email;

    /**
     * String imageUrl
     */
    @Size(max = 256)
    private String imageUrl;

    /**
     * boolean activated
     */
    private boolean activated = false;

    /**
     * String langKey
     */
    @Size(min = 2, max = 10)
    private String langKey;

    /**
     * String createdBy
     */
    private String createdBy;

    /**
     * Instant createdDate
     */
    private Instant createdDate;

    /**
     * String lastModifiedBy
     */
    private String lastModifiedBy;

    /**
     * Instant lastModifiedDate
     */
    private Instant lastModifiedDate;

    /**
     * authorities
     */
    private Set<String> authorities;

    /**
     * Empty Constructor
     */
    public UserDTO() {
        // Empty constructor needed for Jackson.
    }

    /**
     * Constructor 
     * @param user
     */
    public UserDTO(User user) {
        this.id = user.getId();
        this.login = user.getLogin();
        this.firstName = user.getFirstName();
        this.lastName1 = user.getLastName1();
        this.lastName2 = user.getLastName2();
        this.telefono = user.getTelefono();
        this.email = user.getEmail();
        this.activated = user.getActivated();
        this.imageUrl = user.getImageUrl();
        this.langKey = user.getLangKey();
        this.createdBy = user.getCreatedBy();
        this.createdDate = user.getCreatedDate();
        this.lastModifiedBy = user.getLastModifiedBy();
        this.lastModifiedDate = user.getLastModifiedDate();
        this.authorities = user.getAuthorities().stream()
            .map(Authority::getName)
            .collect(Collectors.toSet());
    }

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
    public void setId(final Long id) {
        this.id = id;
    }

    /**
     * Get
     * @return the login 
     */
    public String getLogin() {
        return login;
    }

    /**
     * Set
     * @param login
     */
    public void setLogin(final String login) {
        this.login = login;
    }

    /**
     * Get
     * @return the firstName 
     */
    public String getFirstName() {
        return firstName;
    }

    /**
     * Set
     * @param firstName
     */
    public void setFirstName(final String firstName) {
        this.firstName = firstName;
    }

    /**
     * Get 
     * @return the lastName1 
     */
    public String getLastName1() {
        return lastName1;
    }

    /**
     * Set
     * @param lastName1
     */
    public void setLastName1(final String lastName1) {
        this.lastName1 = lastName1;
    }
    
    /**
     * Get 
     * @return the lastName2
     */
    public String getLastName2() {
        return lastName2;
    }

    /**
     * Set
     * @param lastName2
     */
    public void setLastName2(final String lastName2) {
        this.lastName2 = lastName2;
    }
    
   

    /**
	 * @return the telefono
	 */
	public Set<Telefono> getTelefono() {
		return telefono;
	}

	/**
	 * @param telefono the telefono to set
	 */
	public void setTelefono(Set<Telefono> telefono) {
		this.telefono = telefono;
	}

	/**
     * Get 
     * @return the email 
     */
    public String getEmail() {
        return email;
    }

    /**
     * Set
     * @param email
     */
    public void setEmail(final String email) {
        this.email = email;
    }

    /**
     * Get 
     * @return the imageUrl 
     */
    public String getImageUrl() {
        return imageUrl;
    }

    /**
     * Set 
     * @param imageUrl
     */
    public void setImageUrl(final String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Get 
     * @return the activated 
     */
    public boolean isActivated() {
        return activated;
    }

    /**
     * Set 
     * @param activated
     */
    public void setActivated(final boolean activated) {
        this.activated = activated;
    }

    /**
     * Get 
     * @return the langKey
     */
    public String getLangKey() {
        return langKey;
    }

    /**
     * Set 
     * @param langKey
     */
    public void setLangKey(final String langKey) {
        this.langKey = langKey;
    }

    /**
     * Get 
     * @return the createdBy
     */
    public String getCreatedBy() {
        return createdBy;
    }

    /**
     * Set 
     * @param createdBy
     */
    public void setCreatedBy(final String createdBy) {
        this.createdBy = createdBy;
    }

    /**
     * Get
     * @return the createdDate
     */
    public Instant getCreatedDate() {
        return createdDate;
    }

    /**
     * Set
     * @param createdDate
     */
    public void setCreatedDate(final Instant createdDate) {
        this.createdDate = createdDate;
    }

    /**
     * Get 
     * @return the lastModifiedBy
     */
    public String getLastModifiedBy() {
        return lastModifiedBy;
    }

    /**
     * Set 
     * @param lastModifiedBy
     */
    public void setLastModifiedBy(final String lastModifiedBy) {
        this.lastModifiedBy = lastModifiedBy;
    }

    /**
     * Get 
     * @return the lastModifiedDate
     */
    public Instant getLastModifiedDate() {
        return lastModifiedDate;
    }

    /**
     * Set
     * @param lastModifiedDate
     */
    public void setLastModifiedDate(final Instant lastModifiedDate) {
        this.lastModifiedDate = lastModifiedDate;
    }

    /**
     * Get
     * @return the authorities
     */
    public Set<String> getAuthorities() {
        return authorities;
    }

    /**
     * Set
     * @param authorities
     */
    public void setAuthorities(Set<String> authorities) {
        this.authorities = authorities;
    }

    /**
     * toString
     */
    @Override
    public String toString() {
        return "UserDTO{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName1='" + lastName1 + '\'' +
            ", lastName2='" + lastName2 + '\'' +
            ", telefono='" + telefono + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated=" + activated +
            ", langKey='" + langKey + '\'' +
            ", createdBy=" + createdBy +
            ", createdDate=" + createdDate +
            ", lastModifiedBy='" + lastModifiedBy + '\'' +
            ", lastModifiedDate=" + lastModifiedDate +
            ", authorities=" + authorities +
            "}";
    }
}
