<?php

$databases['default']['default'] = array (
  'database' => 'brookwoo_d10',
  'username' => 'brookwoo_drupal',
  'password' => 'jPeGyLBnoIdP',
  'prefix' => '',
  'host' => 'localhost',
  'port' => '3306',
  'isolation_level' => 'READ COMMITTED',
  'namespace' => 'Drupal\\mysql\\Driver\\Database\\mysql',
  'driver' => 'mysql',
  'autoload' => 'core/modules/mysql/src/Driver/Database/mysql/',
);

$settings['trusted_host_patterns'] = [
  '^brookwoodcenter\.com$',
  '^www\.brookwoodcenter\.com$',
];

$settings['hash_salt'] = 'h5xpmNJ8QyMrO2Bdk0THh4b_0mTo6vdgAPbvYSM4QW0lJgCiyr1C6PGMGcKFKPAXlO2CkjpqCg';

$settings['config_sync_directory'] = 'sites/default/files/config_0P01_uUtDAKQNT8m4T80oyqJgCpH6zVh-bERz8pIbRYVzhIpWVV-bv4Ao9Oo-rR3YL54BAC4kQ/sync';

$settings['state_cache'] = TRUE;
