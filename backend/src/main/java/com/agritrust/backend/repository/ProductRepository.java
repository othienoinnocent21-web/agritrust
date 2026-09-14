package com.agritrust.backend.repository;

import com.agritrust.backend.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    List<Product> findByFarmerId(Long farmerId);

    List<Product> findByTitleContainingIgnoreCase(String title);

    List<Product> findByCategoryIgnoreCase(String category);
}