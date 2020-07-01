package org.constructor.service.multimedia.impl;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.constructor.multimedia.response.MultimediaResponse;
import org.constructor.multimedia.response.VideoResponse;
import org.constructor.service.CursoService;
import org.constructor.service.dto.MultimediaDTO;
import org.constructor.service.multimedia.MultimediaService;
import org.constructor.web.rest.errors.ErrorConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import liquibase.util.file.FilenameUtils;

/**
 * 
 * @author Edukai
 *
 */
@Service
public class MultimediaServiceImpl implements MultimediaService {
	
	/**
	 * CursoService Service
	 */
	@Autowired
	private  CursoService cursoService;
	
	/**
	 * properties audio
	 */
	@Value(value = "${multimedia.audio}")
	private Long audio;

	/**
	 * properties video
	 */
	@Value(value = "${multimedia.video}")
	private Long video;

	/**
	 * properties image
	 */
	@Value(value = "${multimedia.image}")
	private Long image;
	
	/**
	 * properties docs
	 */
	@Value(value = "${multimedia.docs}")
	private Long docs;

	/**
	 * Logger
	 */
	private final Logger log = LoggerFactory.getLogger(MultimediaServiceImpl.class);
	
	/**
	 * StringBuilder
	 */
	private static final StringBuilder UPLOAD_FOLDER = new StringBuilder(System.getProperty("user.home") + "/resources" + File.separator);
	
	/**
	 * String nimbus
	 */
	private static final String nimbus = "nimbus"; 

    
    /**
	 * formatos de extencion.
	 *
	 */
	enum extVideo { MP4, VGA};
	enum extImage { JPG, PNG, JPEG};
	enum extDocs { PDF, DOCX,TXT};
	enum extAudio{ MP3};

	/**     
	 * saveFile
	 */
	@Override
	public VideoResponse<?> saveFile(MultimediaDTO file) {
	    VideoResponse<?> videoResponse = new VideoResponse<>();
	    log.info("*** FileUploadServiceImplement ****");
	    log.info("*** Path Multimedia File : {} ****", UPLOAD_FOLDER);
		Timestamp stamp = new Timestamp(System.currentTimeMillis());
		Date date = new Date(stamp.getTime());
	    DateFormat hourdateFormat = new SimpleDateFormat("-dd-MM-yyyy-HH.mm.ss");
	    String time = hourdateFormat.format(date);
		try {
			
			
				MultipartFile  multimedia =   file.getFile();
				String  extension =   FilenameUtils.getExtension( multimedia.getOriginalFilename());
				String replace = null; 
				videoResponse.setExtension(extension);
				videoResponse.setPeso(multimedia.getSize() /  1024 );
				videoResponse.setName( multimedia.getOriginalFilename());
				//Create Path
				StringBuilder builder = new StringBuilder();
				PathValidation.createPath(UPLOAD_FOLDER.toString());
				
				/**
				 * if para Audio
				 */
				if (extension.toUpperCase().equals(extAudio.MP3.toString())
						 && ((( multimedia.getSize()/1024))/ 1024  ) <=  audio ) {
					buildFile(builder, file);
					builder.append("audio");
					PathValidation.createPath(builder.toString());
				     log.debug("builder audio : {}", builder);
				}

				/**
				 * if para Video
				 */
				if ((  extension.toUpperCase()).equals(extVideo.MP4.toString())
						|| extension.toUpperCase().equals( extVideo.VGA.toString() ) && ((( multimedia.getSize()/1024))/ 1024  ) <=  video ) {
					buildFile(builder, file);
					builder.append( "video" );
					PathValidation.createPath(builder.toString() );
					log.debug("builder Video : {}", builder);
				}       
				
				/**
				 * if para Image
				 */
				if ((extension.toUpperCase()).equals(extImage.PNG.toString())
						|| extension.toUpperCase().equals(extImage.JPG.toString()) || extension.toUpperCase().equals(extImage.JPEG.toString()) && ((( multimedia.getSize()/1024))/ 1024  ) <=  image ) {
					buildFile(builder, file);
					builder.append("image");
					PathValidation.createPath(builder.toString());
					log.debug("builder image : {}", builder);
					
				}
				
				/**
				 * if para Docs
				 */
				if (extension.toUpperCase().equals(extDocs.PDF.toString())
						|| extension.toUpperCase().equals(extDocs.DOCX.toString()) ||extension.toUpperCase().equals(extDocs.TXT.toString()) && ((( multimedia.getSize()/1024))/ 1024  ) <=  docs ) {
					buildFile(builder, file  );
					builder.append("docs");
					PathValidation.createPath(builder.toString());
					log.debug("builder docs : {}", builder);
				}else {
					videoResponse.setPath(null);
				}
				
				builder.append(File.separator);
				builder.append(multimedia.getOriginalFilename().replace(multimedia.getOriginalFilename(), FilenameUtils.getBaseName(multimedia.getOriginalFilename()).concat(time)
						 + "." + FilenameUtils.getExtension(multimedia.getOriginalFilename())).toLowerCase());
	

				/**
				 * Creating and Writing  File
				 */
				byte[] fileBytes = multimedia.getBytes();
				Path path = Paths.get(builder.toString());
				Files.write(path, fileBytes);
				int i = builder.indexOf("nimbus");
				log.debug("i {}", builder.indexOf("nimbus"));
				log.debug("path : {}", builder.substring(i));
				replace = (builder.substring(i)).replace("\\", "/");
				videoResponse.setPath(replace);
				return videoResponse;
			
		 }catch(Exception e){	
			 videoResponse.setSuccess(Boolean.FALSE);
			 videoResponse.setMessage(ErrorConstants.STATUS_MENSSAGE_INVALID);
 
		 }
		return videoResponse;
		
	}



	/**
	 * StringBuilder carpeteo 
	 * 
	 * @param builder
	 * @param file
	 * @return
	 */
    private StringBuilder buildFile(StringBuilder builder,MultimediaDTO file ) {
    	String idCurso = file.getId();
    	builder.append(UPLOAD_FOLDER.toString());
		builder.append(nimbus);
		builder.append(File.separator);
		builder.append(idCurso);
		builder.append(File.separator);
		return builder;
}

    
	/**
	 * deleteCourseCover 
	 * 
	 * 
	 */
	@Override
	public MultimediaResponse deleteCourseCover(Long id) {
		MultimediaResponse multimediaResponse = new MultimediaResponse();
		String status = "";
		String filePath = "";
        String response = "";
		
		log.debug("*************************   deleteCourseCover *******************");
		
		filePath =  cursoService.FindCourseCover(id);
		log.debug("filePath : {}", filePath);
		
		if(filePath == null) {
			log.debug("ID no encontrado ");
			multimediaResponse.setStatus(false);
			multimediaResponse.setMessage("Id not found");
			return multimediaResponse;
		}
			
		status = deleteFile(filePath);
		
		if(status.equals("successful")) {
			multimediaResponse.setStatus(true);
			multimediaResponse.setMessage("File removed successfully");
		}
		if (status.equals("failed")) {
			multimediaResponse.setStatus(false);
			multimediaResponse.setMessage("File not found");
		}
		
		if (status.equals("dependent")) {
			multimediaResponse.setStatus(false);
			multimediaResponse.setMessage("File not found");
		}

		return multimediaResponse;
	}

	/**
	 * deleteFile
	 */
	@Override
	public String deleteFile(String pathfile) {
		log.debug("deleteFile: {} ", pathfile);
		StringBuilder sb = new StringBuilder();
		String status = "";
		boolean found = false;
		
		found = otherCourseCoverExists(pathfile);
		
		if(found) {
			status = "dependent";
			return status;
		}
		sb.append(UPLOAD_FOLDER);
		File file = new File(sb.append(pathfile).toString());
		if (file.exists()) {

			if (file.delete()) {
				status = "successful";
			} else {
				status = "failed";
			}
		}
		return status;
	}
	
	
	
	/**
	 * otherCourseCoverExists
	 */
	public boolean otherCourseCoverExists(String content) {
		boolean isExists = false;
	    long find = 0;
		
		find = cursoService.FindByContentCourseCover(content);	
		
		if(find > 0) {
			isExists = true;
		}else {
			isExists = false;
		}
		return isExists;
	}
	
}
