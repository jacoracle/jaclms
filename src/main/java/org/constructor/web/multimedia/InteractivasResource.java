/**
 * 
 */
package org.constructor.web.multimedia;

import java.io.File;


import org.constructor.multimedia.response.VideoResponse;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.ErrorConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

/**
 * @author Edukai
 *
 */
@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET})
@RequestMapping(RestConstants.PATH_API)
public class InteractivasResource {

	
	/**
	 * properties linux
	 */
	@Value(value = "${rutas.linux}")
	private String lin;

	/**
	 * properties windows
	 */
	@Value(value = "${rutas.windows}")
	private String win;
	/**
	 * operating system
	 */
	String SistemaOperativo = System.getProperty("os.name");
	
	/**
	 * MultimediaService Service
	 */
	@Autowired
    private MultimediaService multimediaService;
	/**
	 * osNameMatch
	 */ 
	 String osNameMatch = SistemaOperativo.toLowerCase();

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(InteractivasResource.class);
	

	/**
	 * Post  fileUpload
	 * @param file
	 * @return
	 */
	@PostMapping(path = RestConstants.PATH_FILE_INTERACTIVAS,  produces = "application/json")
	public ResponseEntity<VideoResponse>  uploadFileInteractivas( @RequestParam("file") MultipartFile file, @RequestParam("id") String id) {
		VideoResponse<?> vr = new VideoResponse<Object>();
		MultimediaDTO multimediaDTO = new MultimediaDTO();
		String carpeta = "actividades";
		multimediaDTO.setFile(file);
		multimediaDTO.setId(id + File.separator+ carpeta );
		log.debug("Upload File: {}", id); 
		
			if (file.isEmpty()) {
				vr.setSuccess(Boolean.FALSE);
				vr.setMessage(ErrorConstants.STATUS_MENSSAGE_FILE);
	            return new ResponseEntity<>(vr,HttpStatus.BAD_REQUEST);
			}	
			else {
				if (id.isEmpty()) {
					vr.setSuccess(Boolean.FALSE);
					vr.setMessage(ErrorConstants.STATUS_MENSSAGE_ID);
		            return new ResponseEntity<>(vr,HttpStatus.BAD_REQUEST);
				}
				
				else {
					if (file != null)  {
						vr = multimediaService.saveFile(multimediaDTO);
					}
			        if(vr.getPath() == null) {
			            
			            return new ResponseEntity<>(vr,HttpStatus.BAD_REQUEST);
			        }
			}
		}
	  return  new ResponseEntity<>(vr,HttpStatus.OK);
	}
	
   
}
