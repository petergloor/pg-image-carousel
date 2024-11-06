<?php
/*
Plugin Name: PG Image Carousel
Plugin URI: https://github.com/petergloor/pg-image-carousel
Description: A simple Gutenberg block image carousel plugin.
Author: Peter Gloor
*/
add_action('enqueue_block_editor_assets', function() {
    wp_register_style(
      'image-carousel', 
      plugins_url('image-carousel.css', __FILE__)
    );
    wp_enqueue_style('image-carousel');
    wp_enqueue_script(
      'image-carousel',
      plugins_url('image-carousel.js', __FILE__),
      array('wp-blocks', 'wp-element')
    );
  });
  add_action('enqueue_block_assets', function() {
    wp_enqueue_script(
      'image-carousel',
      plugins_url('image-carousel.js', __FILE__),
      array('wp-blocks', 'wp-element')
    );
    wp_register_style(
      'test-plugin', 
      plugins_url('image-carousel.css', __FILE__)
    );
    wp_enqueue_style('test-plugin');
  });
?>