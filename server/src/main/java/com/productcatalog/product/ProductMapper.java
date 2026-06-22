package com.productcatalog.product;

import com.productcatalog.product.dto.CreateProductRequest;
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

    public Product toEntity(CreateProductRequest request) {
        Product product = new Product();
        product.setName(request.name());
        product.setDescription(request.description());
        product.setPrice(request.price());
        product.setStock(request.stock());
        product.setThumbnailUrl(request.thumbnailUrl());
        return product;
    }
}
