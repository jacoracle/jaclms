/**
 * 
 */
package org.constructor.service.multimedia.impl;

import java.io.IOException;
import java.util.List;

import org.constructor.service.multimedia.InteractivasService;
import org.constructor.service.multimedia.MultimediaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * @author Edukai
 *
 */
@Service
public class InteractivasServiceImpl  implements InteractivasService{
	
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(InteractivasServiceImpl.class);

	@Autowired
	MultimediaService multimediaService;
	
	/**
	 * deleteFileInteractivas
	 */
	@Override
	public Boolean deleteFileInteractivas(List<String> pathfile) throws IOException{
		Boolean success = false; 
		for (String path : pathfile) {
			multimediaService.deleteFile(path);
			log.debug("Path a borrar, {}", path );
		
		}
		success = true;
		
		
		
		return success;
		
	}
}

		


