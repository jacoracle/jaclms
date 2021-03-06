package org.constructor.web.multimedia;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.constructor.multimedia.response.MultimediaResponse;
import org.constructor.multimedia.response.VideoResponse;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.utils.RestConstants;
import org.constructor.web.rest.errors.ErrorConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping(RestConstants.PATH_API)
public class MultimediaResource {
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(MultimediaResource.class);
	
	/**
	 * MultimediaService Service
	 */
	@Autowired
    private MultimediaService multimediaService;
	
	/**
	 * Post  fileUpload
	 * @param file
	 * @return
	 */
	@PostMapping(path = RestConstants.PATH_FILE_UPLOAD,  produces = "application/json")
	public ResponseEntity<VideoResponse>  uploadFile( @RequestParam("file") MultipartFile file, @RequestParam("id") String id) {
		VideoResponse<?> vr = new VideoResponse<Object>();
		MultimediaDTO multimediaDTO = new MultimediaDTO();
		multimediaDTO.setFile(file);
		multimediaDTO.setId(id);
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
	
	/**
	 * Delete  deleteCourseCover
	 * @param id
	 * @return
	 */
	@DeleteMapping(path = RestConstants.PATH_COURSE_COVER, produces = "application/json")
	public ResponseEntity<String> deleteCourseCover(@RequestParam("id") Long id) {
		
		log.debug("*************************   deleteCourseCover  *******************");
		
		log.debug("Id : {}", id);
		MultimediaResponse response;

		response = multimediaService.deleteCourseCover(id);

		if (response.isStatus()) {
			log.debug(response.getMessage());
			return new ResponseEntity<>(response.getMessage(), HttpStatus.OK);
		} else {
			log.debug(response.getMessage());
			return new ResponseEntity<>(response.getMessage(), HttpStatus.NO_CONTENT);
		}
	}
	
	/**
	 * Delete  deleteFile 
	 * @param file
	 * @return
	 */
	@DeleteMapping(path = RestConstants.PATH_FILE,  produces = "application/json")
	public ResponseEntity<String> deleteFile(@RequestParam("file") String file) {
		
		log.debug("*************************   deleteFile  *******************");
		
		log.debug("Path : {}", file);
		String response = "";

		response = multimediaService.deleteFile(file);

		if (response.equals("successful")) {
			log.debug("file removed successfully");
			return new ResponseEntity<>("file removed successfully", HttpStatus.OK);
		}
		if (response.equals("failed")) {
			log.debug("file not found");
			return new ResponseEntity<>("file not found", HttpStatus.NO_CONTENT);
		}else {
			log.debug("resource with dependency");
			return new ResponseEntity<>("resource with dependency", HttpStatus.ACCEPTED);
		}
	}
}
