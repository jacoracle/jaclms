package org.constructor.domain;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashSet;
import java.util.Set;

import org.constructor.domain.enumeration.ModoDistribucion;
import org.constructor.domain.enumeration.EtapaEditorial;

/**
 * A Curso.
 */
@Entity
@Table(name = "curso")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Curso implements Serializable {

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
     * modo_distribucion
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "modo_distribucion")
    private ModoDistribucion modoDistribucion;

    /**
     * etapa_editorial
     */
    @Enumerated(EnumType.STRING)
    @Column(name = "etapa_editorial")
    private EtapaEditorial etapaEditorial;

    /**
     * LocalDate fechaCreacion
     */
    @Column(name = "fecha_creacion")
    private LocalDate fechaCreacion;

    /**
     * LocalDate fechaCreacionSys
     */
    @Column(name = "fecha_creacion_sys")
    private LocalDateTime fechaCreacionSys;

    /**
     * LocalDate fechaPublicacio
     */
    @Column(name = "fecha_publicacion")
    private LocalDate fechaPublicacion;

    /**
     *  LocalDate fechaPublicacionSys
     */
    @Column(name = "fecha_publicacion_sys")
    private LocalDateTime fechaPublicacionSys;

    /**
     * String numeroEdicion
     */
    @Column(name = "numero_edicion")
    private String numeroEdicion;

    /**
     * String versionStr
     */
    @Column(name = "version_str")
    private String versionStr;

    /**
     * String palabraClave
     */
    @Column(name = "palabra_clave")
    private String palabraClave;

    /**
     * String resumenContenido
     */
    @Column(name = "resumen_contenido")
    private String resumenContenido;

    /**
     * String clave
     */
    @Column(name = "clave")
    private String clave;

    /**
     * String estatus
     */
    @Column(name = "estatus")
    private String estatus;

    /**
     * String portadaUrl
     */
    @Column(name = "portada_url")
    private String portadaUrl;

    /**
     * Ficha 
     */
    @OneToOne(mappedBy = "curso", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Ficha ficha;
    
    /**
     * modalidad
     */
    @ManyToOne
    @JsonIgnoreProperties("cursos") 
    private Modalidad modalidad;

    /**
     * version
     */
    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private Version version;

    /**
     * categoria
     */
    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private Categoria categoria;

    /**
     * asignatura
     */
    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private Asignatura asignatura;

    /**
     * numeroGrado
     */
    @ManyToOne
    @JsonIgnoreProperties("cursos")
    private NumeroGrado numeroGrado;
    
    /**
     * nivelesCurso
     */
    @OneToMany(mappedBy = "curso", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<NivelesCurso> nivelesCurso = new HashSet<>();
    
    /**
     * user
     */
    @JsonIgnore
    @ManyToMany
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    @JoinTable(
            name = "curso_usuario", 
            joinColumns = @JoinColumn(name = "curso_id", referencedColumnName = "id", nullable = false),
            inverseJoinColumns = @JoinColumn(name="usuario_id", referencedColumnName = "id", nullable = false))
    private Set<User> user = new HashSet<>();
    
    
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
     * @return the titulo
     */ 
    public String getTitulo() {
        return titulo;
    }

    /**
     * Curso
     * @param titulo
     * @return
     */
    public Curso titulo(String titulo) {
        this.titulo = titulo;
        return this;
    }

    /**
     * Set
     * @param titulo
     */
    public void setTitulo(String titulo) {
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
     * Cur5so
     * @param descripcion
     * @return
     */
    public Curso descripcion(String descripcion) {
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
     * @return the modoDistribucion
     */
    public ModoDistribucion getModoDistribucion() {
        return modoDistribucion;
    }

    /**
     * Curso
     * @param modoDistribucion
     * @return
     */
    public Curso modoDistribucion(ModoDistribucion modoDistribucion) {
        this.modoDistribucion = modoDistribucion;
        return this;
    }

    /**
     * Set
     * @param modoDistribucion
     */
    public void setModoDistribucion(ModoDistribucion modoDistribucion) {
        this.modoDistribucion = modoDistribucion;
    }

    /**
     * Get 
     * @return the etapaEditorial
     */
    public EtapaEditorial getEtapaEditorial() {
        return etapaEditorial;
    }

    /**
     * Curso 
     * @param etapaEditorial
     * @return
     */
    public Curso etapaEditorial(EtapaEditorial etapaEditorial) {
        this.etapaEditorial = etapaEditorial;
        return this;
    }

    /**
     * Set
     * @param etapaEditorial
     */
    public void setEtapaEditorial(EtapaEditorial etapaEditorial) {
        this.etapaEditorial = etapaEditorial;
    }

    /**
     * Get
     * @return the fechaCreacion
     */
    public LocalDate getFechaCreacion() {
        return fechaCreacion;
    }

    /**
     * Curso 
     * @param fechaCreacion
     * @return
     */
    public Curso fechaCreacion(LocalDate fechaCreacion) {
        this.fechaCreacion = fechaCreacion;
        return this;
    }

    /**
     * Set
     * @param fechaCreacion
     */
    public void setFechaCreacion(String fechaCreacion) {
		if (fechaCreacion == null) {
			this.fechaCreacion = null;
		} else {
			this.fechaCreacion = LocalDate.parse(fechaCreacion,
					DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss.SSSz"));
		}
    }

    /**
     * Get
     * @return the fechaCreacionSys
     */
    public LocalDateTime getFechaCreacionSys() {
        return fechaCreacionSys;
    }

    /**
     * Curso
     * @param fechaCreacionSys
     * @return
     */
    public Curso fechaCreacionSys(LocalDateTime fechaCreacionSys) {
        this.fechaCreacionSys = LocalDateTime.now();;
        return this;
    }

    /**
     * Set
     * @param fechaCreacionSys
     */
    public void setFechaCreacionSys(LocalDateTime fechaCreacionSys) {
        this.fechaCreacionSys = LocalDateTime.now();;
    }

    /**
     * Get 
     * @return the fechaPublicacion
     */
    public LocalDate getFechaPublicacion() {
        return fechaPublicacion;
    }

    /**
     * Curso
     * @param fechaPublicacion
     * @return
     */
    public Curso fechaPublicacion(LocalDate fechaPublicacion) {
        this.fechaPublicacion = fechaPublicacion;
        return this;
    }

    /**
     * Set
     * @param fechaPublicacion
     */
    public void setFechaPublicacion(String fechaPublicacion) {
    	
    	if(fechaPublicacion == null) {
    		this.fechaPublicacion = null;
    	}else {
    		this.fechaPublicacion = LocalDate.parse(fechaPublicacion, DateTimeFormatter.ofPattern ( "yyyy-MM-dd'T'HH:mm:ss.SSSz" ));	
    	}
    }

    /**
     * Get
     * @return the fechaPublicacionSys
     */
    public LocalDateTime getFechaPublicacionSys() {
        return fechaPublicacionSys;
    }

    /**
     * Curso
     * @param fechaPublicacionSys
     * @return
     */
    public Curso fechaPublicacionSys(LocalDateTime fechaPublicacionSys) {
        this.fechaPublicacionSys = LocalDateTime.now();;
        return this;
    }

    /**
     * Set
     * @param fechaPublicacionSys
     */
    public void setFechaPublicacionSys(LocalDateTime fechaPublicacionSys) {
        this.fechaPublicacionSys = LocalDateTime.now();
    }

    /**
     * Get
     * @return the numeroEdicion
     */
    public String getNumeroEdicion() {
        return numeroEdicion;
    }

    /**
     * Curso
     * @param numeroEdicion
     * @return
     */
    public Curso numeroEdicion(String numeroEdicion) {
        this.numeroEdicion = numeroEdicion;
        return this;
    }

    /**
     * Set
     * @param numeroEdicion
     */
    public void setNumeroEdicion(String numeroEdicion) {
        this.numeroEdicion = numeroEdicion;
    }

    /**
     * Get
     * @return the versionStr
     */
    public String getVersionStr() {
        return versionStr;
    }

    /**
     * Curso
     * @param versionStr
     * @return
     */
    public Curso versionStr(String versionStr) {
        this.versionStr = versionStr;
        return this;
    }

    /**
     * Set
     * @param versionStr
     */
    public void setVersionStr(String versionStr) {
        this.versionStr = versionStr;
    }

    /**
     * Get
     * @return the palabraClave
     */
    public String getPalabraClave() {
        return palabraClave;
    }

    /**
     * Curso
     * @param palabraClave
     * @return
     */
    public Curso palabraClave(String palabraClave) {
        this.palabraClave = palabraClave;
        return this;
    }

    /**
     * Set
     * @param palabraClave
     */
    public void setPalabraClave(String palabraClave) {
        this.palabraClave = palabraClave;
    }

    /**
     * Get
     * @return the resumenContenido
     */
    public String getResumenContenido() {
        return resumenContenido;
    }

    /**
     * Curso
     * @param resumenContenido
     * @return
     */
    public Curso resumenContenido(String resumenContenido) {
        this.resumenContenido = resumenContenido;
        return this;
    }

    /**
     * Set
     * @param resumenContenido
     */
    public void setResumenContenido(String resumenContenido) {
        this.resumenContenido = resumenContenido;
    }

    /**
     * Get
     * @return the clave 
     */
    public String getClave() {
        return clave;
    }

    /**
     * Curso
     * @param clave
     * @return
     */
    public Curso clave(String clave) {
        this.clave = clave;
        return this;
    }

    /**
     * Set
     * @param clave
     */
    public void setClave(String clave) {
        this.clave = clave;
    }

    /**
     * Get
     * @return the estatus
     */
    public String getEstatus() {
        return estatus;
    }

    /**
     * Curso 
     * @param estatus
     * @return
     */
    public Curso estatus(String estatus) {
        this.estatus = estatus;
        return this;
    }

    /**
     * Set
     * @param estatus
     */
    public void setEstatus(String estatus) {
        this.estatus = estatus;
    }

    /**
     * Get
     * @return the portadaUrl
     */
    public String getPortadaUrl() {
        return portadaUrl;
    }

    /**
     * Curso
     * @param portadaUrl
     * @return
     */
    public Curso portadaUrl(String portadaUrl) {
        this.portadaUrl = portadaUrl;
        return this;
    }

    /**
     * Set
     * @param portadaUrl
     */
    public void setPortadaUrl(String portadaUrl) {
        this.portadaUrl = portadaUrl;
    }
    
    /**
     * Get
     * @return the ficha
     */
    public Ficha getFicha() {
        return ficha;
    }

    /**
     * Curso
     * @param ficha
     * @return
     */
    public Curso ficha(Ficha ficha) {
        this.ficha = ficha;
        return this;
    }

    /**
     * Set
     * @param ficha
     */
    public void setFicha(Ficha ficha) {
        this.ficha = ficha;
    }

    /**
     * Get
     * @return the modalidad
     */
    public Modalidad getModalidad() {
        return modalidad;
    }

    /**
     * Curso
     * @param modalidad
     * @return
     */
    public Curso modalidad(Modalidad modalidad) {
        this.modalidad = modalidad;
        return this;
    }

    /**
     * Set
     * @param modalidad
     */
    public void setModalidad(Modalidad modalidad) {
        this.modalidad = modalidad;
    }

    /**
     * Get
     * @return ther version
     */
    public Version getVersion() {
        return version;
    }

    /**
     * Curso
     * @param version
     * @return
     */
    public Curso version(Version version) {
        this.version = version;
        return this;
    }

    /**
     * Set
     * @param version
     */
    public void setVersion(Version version) {
        this.version = version;
    }

    /**
     * Get 
     * @return the categoria  
     */
    public Categoria getCategoria() {
        return categoria;
    }

    /**
     * Curso
     * @param categoria
     * @return
     */
    public Curso categoria(Categoria categoria) {
        this.categoria = categoria;
        return this;
    }

    /**
     * Set
     * @param categoria
     */
    public void setCategoria(Categoria categoria) {
        this.categoria = categoria;
    }

    /**
     * Get 
     * @return the asignatura
     */
    public Asignatura getAsignatura() {
        return asignatura;
    }

    /**
     * Curso
     * @param asignatura
     * @return
     */
    public Curso asignatura(Asignatura asignatura) {
        this.asignatura = asignatura;
        return this;
    }

    /**
     * Set
     * @param asignatura
     */
    public void setAsignatura(Asignatura asignatura) {
        this.asignatura = asignatura;
    }

    /**
     * Get 
     * @return the numeroGrado
     */
    public NumeroGrado getNumeroGrado() {
        return numeroGrado;
    }

    /**
     * Curso
     * @param numeroGrado
     * @return
     */
    public Curso numeroGrado(NumeroGrado numeroGrado) {
        this.numeroGrado = numeroGrado;
        return this;
    }

    /**
     * Set
     * @param numeroGrado
     */
    public void setNumeroGrado(NumeroGrado numeroGrado) {
        this.numeroGrado = numeroGrado;
    }
    
    
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    /**
     * Get
     * @return the user
     */
    public Set<User> getUser() {
		return user;
	}

    /**
     * Set
     * @param user
     */
	public void setUser(Set<User> user) {
		this.user = user;
	}
	
	/**
	 * @return the nivelesCurso
	 */
	public Set<NivelesCurso> getNivelesCurso() {
		return nivelesCurso;
	}

	/**
	 * @param nivelesCurso the nivelesCurso to set
	 */
	public void setNivelesCurso(Set<NivelesCurso> nivelesCurso) {
		this.nivelesCurso = nivelesCurso;
	}

	/**
	 * equals
	 */
	@Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Curso)) {
            return false;
        }
        return id != null && id.equals(((Curso) o).id);
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
        return "Curso{" +
            "id=" + getId() +
            ", titulo='" + getTitulo() + "'" +
            ", descripcion='" + getDescripcion() + "'" +
            ", modoDistribucion='" + getModoDistribucion() + "'" +
            ", etapaEditorial='" + getEtapaEditorial() + "'" +
            ", fechaCreacion='" + getFechaCreacion() + "'" +
            ", fechaCreacionSys='" + getFechaCreacionSys() + "'" +
            ", fechaPublicacion='" + getFechaPublicacion() + "'" +
            ", fechaPublicacionSys='" + getFechaPublicacionSys() + "'" +
            ", numeroEdicion='" + getNumeroEdicion() + "'" +
            ", versionStr='" + getVersionStr() + "'" +
            ", palabraClave='" + getPalabraClave() + "'" +
            ", resumenContenido='" + getResumenContenido() + "'" +
            ", clave='" + getClave() + "'" +
            ", estatus='" + getEstatus() + "'" +
            ", portadaUrl='" + getPortadaUrl() + "'" +
            "}";
    }
}
