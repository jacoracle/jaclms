package org.constructor.service.multimedia.impl;

import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public  class PathValidation {
	
	/**
	 * Logger
	 */
	private static final  Logger log = LoggerFactory.getLogger(PathValidation.class);

	/**
	 * createPath
	 * 
	 * @param route
	 */
	public static  void createPath(String route) {
		log.debug("Save File: {}", route);
		File path = new File(route);
		try {
			//validating directory
			if(!path.exists()) {
				log.debug("directory not found: {}", route);
				if(path.mkdirs()) {
					log.debug("Creating directory: {}", route);
				}else {
					log.debug("Directory found: {}", route);
				}
			}
		}catch(Exception e) {
			log.debug("Error validating directory", e.getMessage());
	    }
	}
}
