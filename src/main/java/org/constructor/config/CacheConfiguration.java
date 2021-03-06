package org.constructor.config;

import java.time.Duration;

import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;

import org.hibernate.cache.jcache.ConfigSettings;
import io.github.jhipster.config.JHipsterProperties;

import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.annotation.*;

@Configuration
@EnableCaching
public class CacheConfiguration {

	/**
	 * Configuration
	 */
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    /**
     * CacheConfiguration
     * 
     * @param jHipsterProperties
     */
    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration = Eh107Configuration.fromEhcacheCacheConfiguration(
            CacheConfigurationBuilder.newCacheConfigurationBuilder(Object.class, Object.class,
                ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                .build());
    }

    /**
     * HibernatePropertiesCustomizer
     * 
     * @param cacheManager
     * @return hibernateProperties
     */
    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    /**
     * JCacheManagerCustomizer
     * 
     * @return
     */
    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, org.constructor.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, org.constructor.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, org.constructor.domain.User.class.getName());
            createCache(cm, org.constructor.domain.Authority.class.getName());
            createCache(cm, org.constructor.domain.User.class.getName() + ".authorities");
            createCache(cm, org.constructor.domain.Asignatura.class.getName());
            createCache(cm, org.constructor.domain.Asignatura.class.getName() + ".cursos");
            createCache(cm, org.constructor.domain.NumeroGrado.class.getName());
            createCache(cm, org.constructor.domain.NumeroGrado.class.getName() + ".cursos");
            createCache(cm, org.constructor.domain.GradoAcademico.class.getName());
            createCache(cm, org.constructor.domain.GradoAcademico.class.getName() + ".numeroGrados");
            createCache(cm, org.constructor.domain.Curso.class.getName());
            createCache(cm, org.constructor.domain.Ficha.class.getName());
            createCache(cm, org.constructor.domain.Ficha.class.getName() + ".colaboradors");
            createCache(cm, org.constructor.domain.Colaborador.class.getName());
            createCache(cm, org.constructor.domain.Colaborador.class.getName() + ".fichas");
            createCache(cm, org.constructor.domain.Editorial.class.getName());
            createCache(cm, org.constructor.domain.Editorial.class.getName() + ".fichas");
            createCache(cm, org.constructor.domain.RolColaborador.class.getName());
            createCache(cm, org.constructor.domain.RolColaborador.class.getName() + ".colaboradors");
            createCache(cm, org.constructor.domain.Categoria.class.getName());
            createCache(cm, org.constructor.domain.Categoria.class.getName() + ".cursos");
            createCache(cm, org.constructor.domain.Modalidad.class.getName());
            createCache(cm, org.constructor.domain.Modalidad.class.getName() + ".cursos");
            createCache(cm, org.constructor.domain.Version.class.getName());
            createCache(cm, org.constructor.domain.Version.class.getName() + ".cursos");
            // jhipster-needle-ehcache-add-entry
        };
    }

    /**
     * createCache
     * 
     * @param cm
     * @param cacheName
     */
    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cm.destroyCache(cacheName);
        }
        cm.createCache(cacheName, jcacheConfiguration);
    }

}
