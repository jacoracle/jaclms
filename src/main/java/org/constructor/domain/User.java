package org.constructor.domain;

import org.constructor.config.Constants;
import org.constructor.module.domain.Modulo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;
import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

/**
 * A user.
 */
@Entity
@Table(name = "jhi_user")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class User extends AbstractAuditingEntity implements Serializable {

	/**
	 * Serializable
	 */
    private static final long serialVersionUID = 1L;

    /**
     * long id
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * String login
     */
    @NotNull
    @Pattern(regexp = Constants.LOGIN_REGEX)
    @Size(min = 1, max = 50)
    @Column(length = 50, unique = true, nullable = false)
    private String login;

    /**
     * String password
     */
    @NotNull
    @Size(min = 60, max = 60)
    @Column(name = "password_hash", length = 60, nullable = false)
    private String password;

    /**
     * String firstName
     */
    @Size(max = 50)
    @Column(name = "first_name", length = 50)
    private String firstName;

    /**
     * String lastName1
     */
    @Size(max = 50)
    @Column(name = "last_name_1", length = 50)
    private String lastName1;
    
    /**
     * String lastName2
     */
    @Size(max = 50)
    @Column(name = "last_name_2", length = 50)
    private String lastName2;

    /**
     * String email
     */
    @Email
    @Size(min = 5, max = 254)
    @Column(length = 254, unique = true)
    private String email;
    
    
    @OneToMany(cascade = CascadeType.ALL,mappedBy="user", fetch = FetchType.EAGER)
    private Set<Telefono> telefono = new HashSet<>();
    
    // ManyToMany to curso relationship (JAM)
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Curso> curso = new HashSet<>();

 // ManyToMany to module relationship (JAM)
    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY, mappedBy = "user")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Modulo> modulo = new HashSet<>();
    /**
     * Boolean activated
     */
    @NotNull
    @Column(nullable = false)
    private boolean activated = false;

    /**
     * String langKey
     */
    @Size(min = 2, max = 10)
    @Column(name = "lang_key", length = 10)
    private String langKey;

    /**
     * String imageUrl
     */
    @Size(max = 256)
    @Column(name = "image_url", length = 256)
    private String imageUrl;

    /**
     * String activationKey
     */
    @Size(max = 20)
    @Column(name = "activation_key", length = 20)
    @JsonIgnore
    private String activationKey;

    /**
     * String resetKey
     */
    @Size(max = 20)
    @Column(name = "reset_key", length = 20)
    @JsonIgnore
    private String resetKey;

    /**
     * Instant resetDate
     */
    @Column(name = "reset_date")
    private Instant resetDate = null;

    
    /**
     * jhi_user_authority
     */
    @JsonIgnore
    @ManyToMany
    @JoinTable(
        name = "jhi_user_authority",
        joinColumns = {@JoinColumn(name = "user_id", referencedColumnName = "id")},
        inverseJoinColumns = {@JoinColumn(name = "authority_name", referencedColumnName = "name")})
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @BatchSize(size = 20)
    private Set<Authority> authorities = new HashSet<>();

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
     * @return the login
     */
    public String getLogin() {
        return login;
    }

    // Lowercase the login before saving it in database
    
    /**
     * Set
     * @param login
     */
    public void setLogin(String login) {
        this.login = StringUtils.lowerCase(login, Locale.ENGLISH);
    }

    /**
     * Get
     * @return the password
     */
    public String getPassword() {
        return password;
    }

    /**
     * Set
     * @param password
     */
    public void setPassword(String password) {
        this.password = password;
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
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    /**
     * Get
     * @return the  lastName1
     */
    public String getLastName1() {
        return lastName1;
    }

    /**
     * Set
     * @param lastName1
     */
    public void setLastName1(String lastName1) {
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
    public void setLastName2(String lastName2) {
        this.lastName2 = lastName2;
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
    public void setEmail(String email) {
        this.email = email;
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
	 * @return the imageUrl
	 */
	public String getImageUrl() {
        return imageUrl;
    }

	/**
	 * Set
	 * @param imageUrl
	 */
    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    /**
     * Get 
     * @return the activated
     */
    public boolean getActivated() {
        return activated;
    }

    /**
     * Set
     * @param activated
     */
    public void setActivated(boolean activated) {
        this.activated = activated;
    }

    /**
     * Get
     * @return the activationKey
     */
    public String getActivationKey() {
        return activationKey;
    }

    /**
     * Set
     * @param activationKey
     */
    public void setActivationKey(String activationKey) {
        this.activationKey = activationKey;
    }

    /**
     * Get 
     * @return the resetKey
     */
    public String getResetKey() {
        return resetKey;
    }

    /**
     * Set
     * @param resetKey
     */
    public void setResetKey(String resetKey) {
        this.resetKey = resetKey;
    }

    /**
     * Get
     * @return the resetDate
     */
    public Instant getResetDate() {
        return resetDate;
    }

    /**
     * Set
     * @param resetDate
     */
    public void setResetDate(Instant resetDate) {
        this.resetDate = resetDate;
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
    public void setLangKey(String langKey) {
        this.langKey = langKey;
    }

    /**
     * Get
     * @return the authorities
     */
    public Set<Authority> getAuthorities() {
        return authorities;
    }

    /**
     * Set
     * @param authorities
     */
    public void setAuthorities(Set<Authority> authorities) {
        this.authorities = authorities;
    }

    /**
     * equals
     */
    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof User)) {
            return false;
        }
        return id != null && id.equals(((User) o).id);
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
        return "User{" +
            "login='" + login + '\'' +
            ", firstName='" + firstName + '\'' +
            ", lastName1='" + lastName1 + '\'' +
            ", lastName2='" + lastName2 + '\'' +
            ", telefono=  '" + telefono + '\'' +
            ", email='" + email + '\'' +
            ", imageUrl='" + imageUrl + '\'' +
            ", activated='" + activated + '\'' +
            ", langKey='" + langKey + '\'' +
            ", activationKey='" + activationKey + '\'' +
            "}";
    }
}
