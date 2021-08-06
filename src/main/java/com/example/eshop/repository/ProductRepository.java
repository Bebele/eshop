package com.example.eshop.repository;

import com.example.eshop.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {
    Product findById(long id);

    Page<Product> findByCategoryId(long id, Pageable pageable);

    List<Product> findByNameContaining(String name);
}
