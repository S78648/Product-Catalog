package com.productcatalog.product;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

public record ProductResponse(
        @NotNull @Positive Long id,
        @NotBlank @Size(max = 160) String name,
        @NotBlank String description,
        @NotNull @DecimalMin("0.00") BigDecimal price,
        @NotNull @Min(0) Integer stock,
        @NotBlank @Size(max = 500) String thumbnailUrl,
        @NotNull OffsetDateTime createdAt
) {
}
