package org.constructor.web.rest;

import org.constructor.ConstructorApp;
import org.constructor.repository.CursoRepository;
import org.constructor.service.CursoService;
import org.constructor.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.constructor.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.constructor.domain.enumeration.ModoDistribucion;
import org.constructor.domain.Curso;
import org.constructor.domain.enumeration.EtapaEditorial;
/**
 * Integration tests for the {@link CursoResource} REST controller.
 */
@SpringBootTest(classes = ConstructorApp.class)
public class CursoResourceIT {

    private static final String DEFAULT_TITULO = "AAAAAAAAAA";
    private static final String UPDATED_TITULO = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIPCION = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIPCION = "BBBBBBBBBB";

    private static final ModoDistribucion DEFAULT_MODO_DISTRIBUCION = ModoDistribucion.PAGO;
    private static final ModoDistribucion UPDATED_MODO_DISTRIBUCION = ModoDistribucion.GRATUITO;

    private static final EtapaEditorial DEFAULT_ETAPA_EDITORIAL = EtapaEditorial.EDICION;
    private static final EtapaEditorial UPDATED_ETAPA_EDITORIAL = EtapaEditorial.PUBLICADO;

    private static final LocalDate DEFAULT_FECHA_CREACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_CREACION_SYS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_CREACION_SYS = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_PUBLICACION = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PUBLICACION = LocalDate.now(ZoneId.systemDefault());

    private static final LocalDate DEFAULT_FECHA_PUBLICACION_SYS = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_FECHA_PUBLICACION_SYS = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_NUMERO_EDICION = "AAAAAAAAAA";
    private static final String UPDATED_NUMERO_EDICION = "BBBBBBBBBB";

    private static final String DEFAULT_VERSION_STR = "AAAAAAAAAA";
    private static final String UPDATED_VERSION_STR = "BBBBBBBBBB";

    private static final String DEFAULT_PALABRA_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_PALABRA_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_RESUMEN_CONTENIDO = "AAAAAAAAAA";
    private static final String UPDATED_RESUMEN_CONTENIDO = "BBBBBBBBBB";

    private static final String DEFAULT_CLAVE = "AAAAAAAAAA";
    private static final String UPDATED_CLAVE = "BBBBBBBBBB";

    private static final String DEFAULT_ESTATUS = "AAAAAAAAAA";
    private static final String UPDATED_ESTATUS = "BBBBBBBBBB";

    private static final String DEFAULT_PORTADA_URL = "AAAAAAAAAA";
    private static final String UPDATED_PORTADA_URL = "BBBBBBBBBB";

    @Autowired
    private CursoRepository cursoRepository;

    @Autowired
    private CursoService cursoService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restCursoMockMvc;

    private Curso curso;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CursoResource cursoResource = new CursoResource(cursoService);
        this.restCursoMockMvc = MockMvcBuilders.standaloneSetup(cursoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Curso createEntity(EntityManager em) {
        Curso curso = new Curso()
            .titulo(DEFAULT_TITULO)
            .descripcion(DEFAULT_DESCRIPCION)
            .modoDistribucion(DEFAULT_MODO_DISTRIBUCION)
            .etapaEditorial(DEFAULT_ETAPA_EDITORIAL)
            .fechaCreacion(DEFAULT_FECHA_CREACION)
            
            .fechaPublicacion(DEFAULT_FECHA_PUBLICACION)
            .numeroEdicion(DEFAULT_NUMERO_EDICION)
            .versionStr(DEFAULT_VERSION_STR)
            .palabraClave(DEFAULT_PALABRA_CLAVE)
            .resumenContenido(DEFAULT_RESUMEN_CONTENIDO)
            .clave(DEFAULT_CLAVE)
            .estatus(DEFAULT_ESTATUS)
            .portadaUrl(DEFAULT_PORTADA_URL);
        return curso;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Curso createUpdatedEntity(EntityManager em) {
        Curso curso = new Curso()
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION)
            .modoDistribucion(UPDATED_MODO_DISTRIBUCION)
            .etapaEditorial(UPDATED_ETAPA_EDITORIAL)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .numeroEdicion(UPDATED_NUMERO_EDICION)
            .versionStr(UPDATED_VERSION_STR)
            .palabraClave(UPDATED_PALABRA_CLAVE)
            .resumenContenido(UPDATED_RESUMEN_CONTENIDO)
            .clave(UPDATED_CLAVE)
            .estatus(UPDATED_ESTATUS)
            .portadaUrl(UPDATED_PORTADA_URL);
        return curso;
    }

    @BeforeEach
    public void initTest() {
        curso = createEntity(em);
    }

    @Test
    @Transactional
    public void createCurso() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();

        // Create the Curso
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isCreated());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate + 1);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getTitulo()).isEqualTo(DEFAULT_TITULO);
        assertThat(testCurso.getDescripcion()).isEqualTo(DEFAULT_DESCRIPCION);
        assertThat(testCurso.getModoDistribucion()).isEqualTo(DEFAULT_MODO_DISTRIBUCION);
        assertThat(testCurso.getEtapaEditorial()).isEqualTo(DEFAULT_ETAPA_EDITORIAL);
        assertThat(testCurso.getFechaCreacion()).isEqualTo(DEFAULT_FECHA_CREACION);
        assertThat(testCurso.getFechaCreacionSys()).isEqualTo(DEFAULT_FECHA_CREACION_SYS);
        assertThat(testCurso.getFechaPublicacion()).isEqualTo(DEFAULT_FECHA_PUBLICACION);
        assertThat(testCurso.getFechaPublicacionSys()).isEqualTo(DEFAULT_FECHA_PUBLICACION_SYS);
        assertThat(testCurso.getNumeroEdicion()).isEqualTo(DEFAULT_NUMERO_EDICION);
        assertThat(testCurso.getVersionStr()).isEqualTo(DEFAULT_VERSION_STR);
        assertThat(testCurso.getPalabraClave()).isEqualTo(DEFAULT_PALABRA_CLAVE);
        assertThat(testCurso.getResumenContenido()).isEqualTo(DEFAULT_RESUMEN_CONTENIDO);
        assertThat(testCurso.getClave()).isEqualTo(DEFAULT_CLAVE);
        assertThat(testCurso.getEstatus()).isEqualTo(DEFAULT_ESTATUS);
        assertThat(testCurso.getPortadaUrl()).isEqualTo(DEFAULT_PORTADA_URL);
    }

    @Test
    @Transactional
    public void createCursoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = cursoRepository.findAll().size();

        // Create the Curso with an existing ID
        curso.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCursoMockMvc.perform(post("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isBadRequest());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllCursos() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get all the cursoList
        restCursoMockMvc.perform(get("/api/cursos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(curso.getId().intValue())))
            .andExpect(jsonPath("$.[*].titulo").value(hasItem(DEFAULT_TITULO)))
            .andExpect(jsonPath("$.[*].descripcion").value(hasItem(DEFAULT_DESCRIPCION)))
            .andExpect(jsonPath("$.[*].modoDistribucion").value(hasItem(DEFAULT_MODO_DISTRIBUCION.toString())))
            .andExpect(jsonPath("$.[*].etapaEditorial").value(hasItem(DEFAULT_ETAPA_EDITORIAL.toString())))
            .andExpect(jsonPath("$.[*].fechaCreacion").value(hasItem(DEFAULT_FECHA_CREACION.toString())))
            .andExpect(jsonPath("$.[*].fechaCreacionSys").value(hasItem(DEFAULT_FECHA_CREACION_SYS.toString())))
            .andExpect(jsonPath("$.[*].fechaPublicacion").value(hasItem(DEFAULT_FECHA_PUBLICACION.toString())))
            .andExpect(jsonPath("$.[*].fechaPublicacionSys").value(hasItem(DEFAULT_FECHA_PUBLICACION_SYS.toString())))
            .andExpect(jsonPath("$.[*].numeroEdicion").value(hasItem(DEFAULT_NUMERO_EDICION)))
            .andExpect(jsonPath("$.[*].versionStr").value(hasItem(DEFAULT_VERSION_STR)))
            .andExpect(jsonPath("$.[*].palabraClave").value(hasItem(DEFAULT_PALABRA_CLAVE)))
            .andExpect(jsonPath("$.[*].resumenContenido").value(hasItem(DEFAULT_RESUMEN_CONTENIDO)))
            .andExpect(jsonPath("$.[*].clave").value(hasItem(DEFAULT_CLAVE)))
            .andExpect(jsonPath("$.[*].estatus").value(hasItem(DEFAULT_ESTATUS)))
            .andExpect(jsonPath("$.[*].portadaUrl").value(hasItem(DEFAULT_PORTADA_URL)));
    }
    
    @Test
    @Transactional
    public void getCurso() throws Exception {
        // Initialize the database
        cursoRepository.saveAndFlush(curso);

        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", curso.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(curso.getId().intValue()))
            .andExpect(jsonPath("$.titulo").value(DEFAULT_TITULO))
            .andExpect(jsonPath("$.descripcion").value(DEFAULT_DESCRIPCION))
            .andExpect(jsonPath("$.modoDistribucion").value(DEFAULT_MODO_DISTRIBUCION.toString()))
            .andExpect(jsonPath("$.etapaEditorial").value(DEFAULT_ETAPA_EDITORIAL.toString()))
            .andExpect(jsonPath("$.fechaCreacion").value(DEFAULT_FECHA_CREACION.toString()))
            .andExpect(jsonPath("$.fechaCreacionSys").value(DEFAULT_FECHA_CREACION_SYS.toString()))
            .andExpect(jsonPath("$.fechaPublicacion").value(DEFAULT_FECHA_PUBLICACION.toString()))
            .andExpect(jsonPath("$.fechaPublicacionSys").value(DEFAULT_FECHA_PUBLICACION_SYS.toString()))
            .andExpect(jsonPath("$.numeroEdicion").value(DEFAULT_NUMERO_EDICION))
            .andExpect(jsonPath("$.versionStr").value(DEFAULT_VERSION_STR))
            .andExpect(jsonPath("$.palabraClave").value(DEFAULT_PALABRA_CLAVE))
            .andExpect(jsonPath("$.resumenContenido").value(DEFAULT_RESUMEN_CONTENIDO))
            .andExpect(jsonPath("$.clave").value(DEFAULT_CLAVE))
            .andExpect(jsonPath("$.estatus").value(DEFAULT_ESTATUS))
            .andExpect(jsonPath("$.portadaUrl").value(DEFAULT_PORTADA_URL));
    }

    @Test
    @Transactional
    public void getNonExistingCurso() throws Exception {
        // Get the curso
        restCursoMockMvc.perform(get("/api/cursos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCurso() throws Exception {
        // Initialize the database
        cursoService.save(curso);

        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // Update the curso
        Curso updatedCurso = cursoRepository.findById(curso.getId()).get();
        // Disconnect from session so that the updates on updatedCurso are not directly saved in db
        em.detach(updatedCurso);
        updatedCurso
            .titulo(UPDATED_TITULO)
            .descripcion(UPDATED_DESCRIPCION)
            .modoDistribucion(UPDATED_MODO_DISTRIBUCION)
            .etapaEditorial(UPDATED_ETAPA_EDITORIAL)
            .fechaCreacion(UPDATED_FECHA_CREACION)
            .fechaPublicacion(UPDATED_FECHA_PUBLICACION)
            .numeroEdicion(UPDATED_NUMERO_EDICION)
            .versionStr(UPDATED_VERSION_STR)
            .palabraClave(UPDATED_PALABRA_CLAVE)
            .resumenContenido(UPDATED_RESUMEN_CONTENIDO)
            .clave(UPDATED_CLAVE)
            .estatus(UPDATED_ESTATUS)
            .portadaUrl(UPDATED_PORTADA_URL);

        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCurso)))
            .andExpect(status().isOk());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate);
        Curso testCurso = cursoList.get(cursoList.size() - 1);
        assertThat(testCurso.getTitulo()).isEqualTo(UPDATED_TITULO);
        assertThat(testCurso.getDescripcion()).isEqualTo(UPDATED_DESCRIPCION);
        assertThat(testCurso.getModoDistribucion()).isEqualTo(UPDATED_MODO_DISTRIBUCION);
        assertThat(testCurso.getEtapaEditorial()).isEqualTo(UPDATED_ETAPA_EDITORIAL);
        assertThat(testCurso.getFechaCreacion()).isEqualTo(UPDATED_FECHA_CREACION);
        assertThat(testCurso.getFechaCreacionSys()).isEqualTo(UPDATED_FECHA_CREACION_SYS);
        assertThat(testCurso.getFechaPublicacion()).isEqualTo(UPDATED_FECHA_PUBLICACION);
        assertThat(testCurso.getFechaPublicacionSys()).isEqualTo(UPDATED_FECHA_PUBLICACION_SYS);
        assertThat(testCurso.getNumeroEdicion()).isEqualTo(UPDATED_NUMERO_EDICION);
        assertThat(testCurso.getVersionStr()).isEqualTo(UPDATED_VERSION_STR);
        assertThat(testCurso.getPalabraClave()).isEqualTo(UPDATED_PALABRA_CLAVE);
        assertThat(testCurso.getResumenContenido()).isEqualTo(UPDATED_RESUMEN_CONTENIDO);
        assertThat(testCurso.getClave()).isEqualTo(UPDATED_CLAVE);
        assertThat(testCurso.getEstatus()).isEqualTo(UPDATED_ESTATUS);
        assertThat(testCurso.getPortadaUrl()).isEqualTo(UPDATED_PORTADA_URL);
    }

    @Test
    @Transactional
    public void updateNonExistingCurso() throws Exception {
        int databaseSizeBeforeUpdate = cursoRepository.findAll().size();

        // Create the Curso

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCursoMockMvc.perform(put("/api/cursos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(curso)))
            .andExpect(status().isBadRequest());

        // Validate the Curso in the database
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCurso() throws Exception {
        // Initialize the database
        cursoService.save(curso);

        int databaseSizeBeforeDelete = cursoRepository.findAll().size();

        // Delete the curso
        restCursoMockMvc.perform(delete("/api/cursos/{id}", curso.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Curso> cursoList = cursoRepository.findAll();
        assertThat(cursoList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
