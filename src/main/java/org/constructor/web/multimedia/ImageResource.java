
package org.constructor.web.multimedia;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.constructor.security.AuthoritiesConstants;
import org.constructor.utils.RestConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
public class ImageResource {
	
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
	private final Logger log = LoggerFactory.getLogger(ImageResource.class);
	
	
	/**
	 * method Get  loadImage
	 * @param nameImage
	 * @return
	 */
	@RequestMapping(path = RestConstants.PATH_LOAD_IMAGE, method = RequestMethod.GET)
	@Secured({ AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER })
	public ResponseEntity<byte[]> loadImage(@RequestParam("file") String nameImage) throws IOException {
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

		HttpHeaders headers = new HttpHeaders();
		log.info("*************Nimbus Image Request*************");
		log.info("******** Path:  {}****** ", builder);
		byte[] fileArray = new byte[1];
		File file = new File(builder.append(nameImage).toString());
		
		if(!file.exists()) {
			fileArray[0] = 0;
			log.info("******** Path not found : {}****** ", builder.append(nameImage).toString() );
			headers.setContentType(MediaType.IMAGE_PNG);
			return new ResponseEntity<>(fileArray,HttpStatus.BAD_REQUEST);
		} 
		
		log.debug("********Load Image ******: {}", file);
		fileArray = new byte[(int) file.length()];
		
		try { 
			FileInputStream read = new FileInputStream(file);
			log.debug("******** Reading File: {} *****", nameImage);
			read.read(fileArray);
			read.close();
			log.debug("******** Sending File: {} *****", nameImage);
			headers.setContentType(MediaType.IMAGE_PNG);
			return new ResponseEntity<>(fileArray,headers,HttpStatus.OK);
		
		}catch(IOException ex){
			headers.setContentType(MediaType.IMAGE_PNG);
			return new ResponseEntity<>(fileArray,HttpStatus.BAD_REQUEST);
		}
		
	}

}
