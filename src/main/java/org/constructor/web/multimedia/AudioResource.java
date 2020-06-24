/**
 * 
 */
package org.constructor.web.multimedia;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.constructor.security.AuthoritiesConstants;
import org.constructor.utils.RestConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Edukai
 *
 */
@RestController
@RequestMapping(RestConstants.PATH_API)
public class AudioResource {

	/**
	 * path
	 */
	private static final String PATH = System.getProperty("user.home") + "/resources" + File.separator;
	
	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(AudioResource.class);
	
	
	/**
	 * method Get 
	 *  
	 * audio/mpeg
	 * 
	 * @param nameAudio
	 * @return
	 * @throws IOException 
	 */
	@RequestMapping(path = RestConstants.PATH_LOAD_AUDIO, method = RequestMethod.GET, produces = "audio/mpeg")
	@Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
	public ResponseEntity<byte[]> loadAudio(@RequestParam("file") String nameAudio) throws IOException {
		StringBuilder builder = new StringBuilder();
		builder.append(PATH);
		log.debug("******** Nimbus Audio Request ******");
		log.debug("******** Path:  {} ****** ", PATH);
		
		byte[] fileArray = new byte[1];
		File file = new File(builder.append(nameAudio).toString());
		if(!file.exists()) {
			log.debug("******** Path not found****** ");
			fileArray[0] = 0;
			
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.BAD_REQUEST);
		} 
		log.debug("********Load audio... ******");
		fileArray = new byte[(int) file.length()];
		
		try { 
			FileInputStream read = new FileInputStream(file);
			log.debug("******** Reading File: {} *****", nameAudio);
			read.read(fileArray);
			read.close();
			log.debug("******** Sending File: {} *****", nameAudio);
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.OK);
		
		}catch(IOException ex){
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.BAD_REQUEST);
		}
		
	}
}
