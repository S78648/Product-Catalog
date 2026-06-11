package com.productcatalog.product;

import java.time.ZoneOffset;
import org.springframework.stereotype.Component;

@Component
public class ProductMapper {

    public ProductResponse toResponse(Product product) {
        return new ProductResponse(
                product.getId(),
                product.getName(),
                product.getDescription(),
                product.getPrice(),
                product.getStock(),
                product.getThumbnailUrl(),
                product.getCreatedAt().atOffset(ZoneOffset.UTC)
        );
    }
}
