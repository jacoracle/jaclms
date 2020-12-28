/**
 * 
 */
package org.constructor.utils;

/**
 * @author By EDUKAI
 *
 */
public class RestConstants {

	/**
	 * Private constructor
	 */
	private RestConstants() {
		// Private Constructor
	}

	/**
	 * PAHT api
	 */
	public static final String PATH_API = "api";

	// ---------------Multimedia--------------------

	/**
	 * Path para peticiones fileUpload
	 */
	public static final String PATH_FILE_UPLOAD = "fileUpload";

	/**
	 * Path para peticiones courseCover
	 */
	public static final String PATH_COURSE_COVER = "courseCover";

	/**
	 * Path para peticiones file
	 */
	public static final String PATH_FILE = "file";
	
	/**
	 * Path para peticiones fileInteractivas
	 */
	public static final String PATH_DELETE_FILE = "fileInteractivas";

	// ---------------Video--------------------

	/**
	 * Path para peticiones loadVideo
	 */
	public static final String PATH_LOAD_VIDEO = "loadVideo";

	/**
	 * Path para peticiones videoPreview
	 */
	public static final String PATH_VIDEO_PREVIEW = "videoPreview";

	/**
	 * Path para peticiones videoFrame
	 */
	public static final String PATH_VIDEO_FRAME = "videoFrame";

	// ---------------Audio--------------------

	/**
	 * Path para peticiones loadAudio
	 */
	public static final String PATH_LOAD_AUDIO = "loadAudio";

	// ---------------Imagen--------------------

	/**
	 * Path para peticiones loadAudio
	 */
	public static final String PATH_LOAD_IMAGE = "loadImage";

	// ---------------Docs--------------------

	/**
	 * Path para peticiones loadDocs
	 */
	public static final String PATH_LOAD_DOCS = "loadDocs";

	// ---------------Autor--------------------

	/**
	 * Path para peticiones autor
	 */
	public static final String PATH_AUTHOR = "autor";
	/**
	 * Path para peticiones autor por id
	 */
	public static final String PATH_AUTHOR_ID = "autor/{id}";

	// ---------------Pais--------------------

	/**
	 * Path para peticiones pais
	 */
	public static final String PATH_PAIS = "pais";

	// ---------------Contenido--------------------

	/**
	 * Path para peticiones contenido
	 */
	public static final String PATH_CONTENIDO = "contenido";

	// ---------------TiposBloquesComponentes--------------------

	/**
	 * Path para peticiones tipos-bloques-componentes
	 */
	public static final String PATH_TIPOS_BLOQUES_COMPONENTES = "tipos-bloques-componentes";

	/**
	 * Path para peticiones tipos-bloques-componentes por id
	 */
	public static final String PATH_TIPOS_BLOQUES_COMPONENTES_ID = "tipos-bloques-componentes/{id}";

	// ---------------BloquesCurso--------------------

	/*
	 * Path para peticiones bloquesCurso
	 */
	public static final String PATH_BLOQUES_CURSO = "bloques-curso";

	/**
	 * Path para peticiones bloquesCurso por id
	 */
	public static final String PATH_BLOQUE_CURSO_ID = "bloques-curso/{id}";

	// ---------------Actividades--------------------

	/**
	 * Path para peticiones actividad
	 */
	public static final String ACTIVIDAD = "actividad";

	/**
	 * Path para peticiones actividad by id
	 */
	public static final String ACTIVIDAD_ID = "actividad/{id}";

	/**
	 * Path para peticiones tipoActividadInteractiva
	 */
	public static final String TIPO_ACTIVIDAD = "tipo-actividad";

	/**
	 * Path para peticiones tipoActividadInteractiva
	 */
	public static final String TIPO_ACTIVIDAD_ID = "tipo-actividad/{id}";

	
	/**
	 * Path para peticiones fileUploadInteractivas
	 */
	public static final String PATH_FILE_INTERACTIVAS = "fileUploadInteractivas";


	

	// ---------------Temas--------------------

	/**
	 * Path para peticiones temas
	 */
	public static final String PATH_TEMAS = "temas";

	/**
	 * Path para peticiones temas por id
	 */
	public static final String PATH_TEMAS_ID = "temas/{id}";

	// ---------------Modulo--------------------

	/**
	 * Path para peticiones modulo
	 */
	public static final String PATH_MODULO = "modulo";
	/**
	 * Path para peticiones modulo-ALL
	 */
	public static final String PATH_MODULO_ALL = "modulo-all";

	/**
	 * Path para peticiones modulo por id
	 */
	public static final String PATH_MODULO_ID = "modulo/{id}";
	
	/**
	 * Path para peticiones tipo_modulo
	 */
	public static final String PATH_TIPO_MODULO = "tipo-modulo";

	/**
	 * Path para peticiones tipo_modulo
	 */
	public static final String PATH_TIPO_MODULO_ID = "tipo-modulo/{id}";

	// ---------------Agrupador--------------------

	/**
	 * Path para peticiones agrupador
	 */
	public static final String PATH_AGRUPADOR = "agrupador";

	/**
	 * Path para peticiones agrupador
	 */
	public static final String PATH_AGRUPADOR_ALL = "agrupador-all";

	/**
	 * Path para peticiones agrupador por id
	 */
	public static final String PATH_AGRUPADOR_ID = "agrupador/{id}";

	/**
	 * Path para peticiones agrupador modulo
	 */
	public static final String PATH_AGRUPADOR_MODULO = "agrupador-modulo";

	/**
	 * Path para peticiones agrupador modulo por id
	 */
	public static final String PATH_AGRUPADOR_MODULO_ID = "agrupador-modulo/{id}";

	/**
	 * Path para peticiones busqueda 
	 */
	public static final String PATH_BUSQUEDA = "modulo-filtros";
	
	/**
	 * Path para peticiones busqueda  agrupador
	 */
	public static final String PATH_BUSQUEDA_AGRUPADOR = "agrupador-filtros";
	
	// ---------------Rutas--------------------
	
	/**
	 * Path para peticiones ruta 
	 */
	public static final String PATH_RUTAS = "rutas";
	
	/**
	 * Path para peticiones ruta 
	 */
	public static final String PATH_RUTAS_ALL = "rutas-all";
		
	/**
	 * Path para peticiones rutas por id
	 */
	public static final String PATH_RUTA_ID = "rutas/{id}";
		
	/**
	 * Path para peticiones nivel-jerarquico 
	 */
	public static final String PATH_NIVEL_JERARQUICO = "nivel-jerarquico";
	
	/**
	 * Path para peticiones nivel-jerarquicos 
	 */
	public static final String PATH_NIVEL_JERARQUICOS = "nivel-jerarquicos";
		
	/**
	 * Path para peticiones  nivel-jerarquico  por id
	 */
	public static final String PATH_NIVEL_JERARQUICO_ID = "nivel-jerarquico/{id}";
	
	/**
	 * Path para peticiones  nivel-agrupador  por id
	 */
	public static final String PATH_NIVEL_AGRUPADOR_ID = "nivel-agrupador/{id}";
}
