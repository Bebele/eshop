package com.example.eshop.services;

import com.example.eshop.entities.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


import java.util.List;

public interface ProductService {
    List<Product> findAllProducts();

    Product saveProduct(Product product);

    Product findById(long id);

    Product update(Product product);

    void deleteProduct(long id);

    Page<Product> findByCategoryId(long id, Pageable pageable);

    List<Product> findByName(String name);
}
