package org.constructor.web.multimedia;


import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;

import org.constructor.security.AuthoritiesConstants;
import org.constructor.utils.RestConstants;
import org.jcodec.api.FrameGrab;
import org.jcodec.api.JCodecException;
import org.jcodec.common.model.Picture;
import org.jcodec.scale.AWTUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


import java.awt.image.BufferedImage;
import javax.imageio.ImageIO;

/**
 * The Class VideoResource.
 */
@RestController
@RequestMapping(RestConstants.PATH_API)
public class VideoResource {
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
	
	/** Logger. */
	private final Logger log = LoggerFactory.getLogger(VideoResource.class);
	
	
	/**
	 * method Get 
	 *  
	 * video/mp4.
	 *
	 * @param nameVideo the name video
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@RequestMapping(path = RestConstants.PATH_LOAD_VIDEO, method = RequestMethod.GET, produces = "video/mp4")
	@Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
	public ResponseEntity<byte[]> loadVideo(@RequestParam("file") String nameVideo) throws IOException {
		boolean  banner = false;
		
		return videoBanner(banner, nameVideo);
		
	}
	
	
	/**
	 * Pre view video.
	 *
	 * @param nameVideo the name video
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 */
	@GetMapping(path = RestConstants.PATH_VIDEO_PREVIEW, produces = "video/mp4")
	@Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
	public ResponseEntity<byte[]> preViewVideo(@RequestParam("file") String nameVideo) throws IOException {
		boolean  banner = true;
		return videoBanner(banner,nameVideo);
		
	}
	
	/**
	 * Frame video.
	 *
	 * @param nameVideo the name video
	 * @return the response entity
	 * @throws IOException Signals that an I/O exception has occurred.
	 * @throws JCodecException the j codec exception
	 */
	@GetMapping(path = RestConstants.PATH_VIDEO_FRAME, produces = "image/png")
	@Secured({AuthoritiesConstants.ADMIN, AuthoritiesConstants.USER})
	public ResponseEntity<byte[]> frameVideo(@RequestParam("file") String nameVideo) throws IOException, JCodecException{
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
		File file = new File(builder.append(nameVideo).toString());
		int frameNumber = 255;
		Picture frame = FrameGrab.getFrameFromFile(file, frameNumber);
		BufferedImage bi = AWTUtil.toBufferedImage(frame);
		ByteArrayOutputStream baos = new ByteArrayOutputStream();
		ImageIO.write(bi, "png",baos);
		
		byte[] imageBytes = baos.toByteArray();
		
		return new  ResponseEntity<byte[]>(imageBytes,HttpStatus.OK);
	}
	
	
	

	/**
	 * Video banner.
	 *
	 * @param banner the banner
	 * @param nameVideo the name video
	 * @return the response entity
	 */
	private ResponseEntity<byte[]> videoBanner(Boolean banner, String nameVideo ) {
		
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
		log.debug("******** Nimbus Video Request ******");
		log.debug("******** Path:  {} ****** ", nameVideo);
		
		byte[] fileArray = new byte[1];
		File file = new File(builder.append(nameVideo).toString());
		if(!file.exists()) {
			log.debug("******** Path not found****** ");
			fileArray[0] = 0;
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.BAD_REQUEST);
		} 
		log.debug("********Load video... ******");
		
		if (banner) {
			
			fileArray = new byte[288888];
			log.debug("******** Longitud: {} *****", (int) file.length());
			
		} else if (!banner) {

			fileArray = new byte[(int) file.length()];
		}
		
		try { 
			FileInputStream read = new FileInputStream(file);
			log.debug("******** Reading File: {} *****", nameVideo);
			read.read(fileArray);
			read.close();
			log.debug("******** Sending File: {} *****", nameVideo);
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.OK);
		
		}catch(IOException ex){
			return new ResponseEntity<byte[]>(fileArray,HttpStatus.BAD_REQUEST);
		}
		
	}
	
}

