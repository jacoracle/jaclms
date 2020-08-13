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
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Edukai
 *
 */

@RestController
@CrossOrigin(origins = "*", methods= {RequestMethod.GET})
@RequestMapping(RestConstants.PATH_API)
public class DocsResource {


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
	private final Logger log = LoggerFactory.getLogger(DocsResource.class);


    /**
     * method Get  loadDocs
     * @param nameDocs
     * @return
     */
    @RequestMapping(path = RestConstants.PATH_LOAD_DOCS, method = RequestMethod.GET )
    @Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
    public ResponseEntity<byte[]> loadDocs(@RequestParam("file") String nameDocs) throws IOException {
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
        log.debug("*************Nimbus docs Request*************");
        log.debug("******* Path:  {}***** ", builder);
        byte[] fileArray = new byte[1];
        File file = new File(builder.append(nameDocs).toString());

        if(!file.exists()) {
            fileArray[0] = 0;
            log.debug("******* Path not found***** ");
            headers.setContentType(MediaType.APPLICATION_PDF);
            return new ResponseEntity<>(fileArray,HttpStatus.BAD_REQUEST);
        }

        log.debug("********Load docs ******: {}", file);
        fileArray = new byte[(int) file.length()];

        try {
            FileInputStream read = new FileInputStream(file);
            log.debug("******* Reading File: {} ****", nameDocs);
            read.read(fileArray);
            read.close();
            log.debug("******* Sending File: {} ****", nameDocs);
            headers.setContentType(MediaType.APPLICATION_PDF);
            return new ResponseEntity<>(fileArray,headers,HttpStatus.OK);

        }catch(IOException ex){
            headers.setContentType(MediaType.APPLICATION_PDF);
            return new ResponseEntity<>(fileArray,HttpStatus.BAD_REQUEST);
        }

    }


}
