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
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
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
	 * osNameMatch
	 */
	 String osNameMatch = SistemaOperativo.toLowerCase();
	

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
	  	if (osNameMatch.equals("windows 10") || osNameMatch.equals("windows 8")
		           || osNameMatch.equals("windows 7"))

		{
			String raiz = System.getProperty("user.home");
			builder.append(raiz).append(win);
		}

		else {
			builder.append(lin);
		}
			
		log.debug("******** Nimbus Audio Request ******");
		log.debug("******** Path:  {} ****** ", builder);
		
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
