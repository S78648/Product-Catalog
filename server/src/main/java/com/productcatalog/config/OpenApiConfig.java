package com.productcatalog.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI productCatalogOpenApi(
            @Value("${spring.application.name}") String applicationName
    ) {
        return new OpenAPI()
                .info(new Info()
                        .title("Product Catalog API")
                        .description("REST API for the Product Catalog e-commerce application")
                        .version("v1")
                        .contact(new Contact()
                                .name("Product Catalog Team")))
                .addServersItem(new Server().url("/").description(applicationName));
    }
}
