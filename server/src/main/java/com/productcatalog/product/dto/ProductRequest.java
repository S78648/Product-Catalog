package com.productcatalog.product.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;

public record ProductRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 160, message = "Name must be at most 160 characters")
        String name,

        @NotBlank(message = "Description is required")
        @Size(max = 1000, message = "Description must be at most 1000 characters")
        String description,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.00", message = "Price must be zero or greater")
        BigDecimal price,

        @NotNull(message = "Stock is required")
        @Min(value = 0, message = "Stock must be zero or greater")
        Integer stock,

        @NotBlank(message = "Thumbnail URL is required")
        @Size(max = 500, message = "Thumbnail URL must be at most 500 characters")
        String thumbnailUrl
) {
}
