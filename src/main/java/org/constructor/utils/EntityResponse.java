/**
 * 
 */
package org.constructor.utils;

/**
 * @author Norman Erick Estrada
 *
 */

import javax.persistence.NoResultException;

import org.constructor.web.rest.errors.ErrorConstants;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.multipart.support.MissingServletRequestPartException;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import com.google.protobuf.ServiceException;

/**
 * @author Edukai
 *
 */

@ControllerAdvice
public class EntityResponse extends ResponseEntityExceptionHandler {

	/**
	 * Log
	 */
	private static final Logger LOG = LoggerFactory.getLogger(EntityResponse.class);
	
	
	/**
     * Handle MissingServletRequestParameterException. Triggered when a 'required' request parameter is missing.
     *
     * @param ex      MissingServletRequestParameterException
     * @param headers HttpHeaders
     * @param status  HttpStatus
     * @param request WebRequest
     * @return the ApiError object
     */
	@Override
    protected ResponseEntity<Object> handleMissingServletRequestParameter(
            MissingServletRequestParameterException ex,HttpHeaders headers,
            HttpStatus status, WebRequest request ) {
    	final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        final String error = "Parámetro requerido: " + ex.getParameterName() ;
        final ParamOutputTO<Void> response = new ParamOutputTO<>();
        response.setSuccess(Boolean.FALSE);
		response.setMessage(error);

        return new ResponseEntity<>(response, httpStatus);
    }
    
	
	/**
	 *  handleMissingServletRequestPart  
	 *  exception for file parameter
	 */
	@Override
    protected ResponseEntity<Object>handleMissingServletRequestPart(MissingServletRequestPartException ex,
    		HttpHeaders headers, HttpStatus
    		status, WebRequest request) {
    	final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
        final String error = "Parámetro requerido: " + ex.getRequestPartName() ;
        final ParamOutputTO<Void> response = new ParamOutputTO<>();
        response.setSuccess(Boolean.FALSE);
		response.setMessage(error);

        return new ResponseEntity<>(response, httpStatus);
    }
    
    /**
     * NoResultException
     * @param exc
     * @return
     */
	@ExceptionHandler(NoResultException.class)
	public ResponseEntity<ParamOutputTO<Void>> createResponseEntity(final NoResultException exc) {
		LOG.info("Ingresando al handler para NoResultException");
		final HttpStatus httpStatus = HttpStatus.OK;
		final ParamOutputTO<Void> response = new ParamOutputTO<>();
		response.setSuccess(Boolean.FALSE);
		response.setMessage(ErrorConstants.STATUS_MENSSAGE_201);
		return new ResponseEntity<>(response, httpStatus);
	}
	
	
	
	/**
	 * 
	 * @param sEx
	 * @return ResponseEntity
	 */
	@ExceptionHandler(ServiceException.class)
	public ResponseEntity<ParamOutputTO<Void>> createResponseEntity(ServiceException sEx) {
		LOG.info("Entrando al ResponseEntity");
		final String message = sEx.getMessage();
		final HttpStatus httpStatus = HttpStatus.BAD_REQUEST;
		final ParamOutputTO<Void> response = new ParamOutputTO<>();
		response.setSuccess(Boolean.FALSE);
		response.setMessage(message);
		return new ResponseEntity<>(response, httpStatus);
	}
	
	
	
}
	
	