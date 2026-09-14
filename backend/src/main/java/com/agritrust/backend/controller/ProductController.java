package com.agritrust.backend.controller;

import com.agritrust.backend.entity.Product;
import com.agritrust.backend.service.ProductService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @GetMapping("/farmer/{farmerId}")
    public ResponseEntity<List<Product>> getProductsByFarmer(
            @PathVariable Long farmerId) {
        return ResponseEntity.ok(productService.getProductsByFarmer(farmerId));
    }

    @GetMapping("/search")
    public ResponseEntity<List<Product>> searchProducts(
            @RequestParam String q) {
        return ResponseEntity.ok(productService.searchProducts(q));
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(
            @Valid @RequestBody Product product) {
        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(productService.createProduct(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @Valid @RequestBody Product product) {
        return ResponseEntity.ok(productService.updateProduct(id, product));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}