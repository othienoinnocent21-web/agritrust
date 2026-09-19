
package com.agritrust.backend.service;

import com.agritrust.backend.entity.Product;
import com.agritrust.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Product not found with id: " + id));
    }

    public List<Product> getProductsByFarmer(Long farmerId) {
        return productRepository.findByFarmerId(farmerId);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Long id, Product productDetails) {

        Product product = getProductById(id);

        // Prevent changing the owner of an existing product
        if (productDetails.getFarmerId() != null
                && !product.getFarmerId().equals(productDetails.getFarmerId())) {

            throw new RuntimeException(
                    "You cannot change the owner of this product");
        }

        product.setTitle(productDetails.getTitle());
        product.setDescription(productDetails.getDescription());
        product.setPrice(productDetails.getPrice());
        product.setUnit(productDetails.getUnit());
        product.setQuantity(productDetails.getQuantity());
        product.setCategory(productDetails.getCategory());
        product.setLocation(productDetails.getLocation());
        product.setIsOrganic(productDetails.getIsOrganic());
        product.setIsAvailable(productDetails.getIsAvailable());

        return productRepository.save(product);
    }

    public void deleteProduct(Long id) {

        Product product = getProductById(id);

        productRepository.delete(product);
    }

    public List<Product> searchProducts(String query) {
        return productRepository.findByTitleContainingIgnoreCase(query);
    }
}

