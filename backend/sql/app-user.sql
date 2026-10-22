   CREATE USER IF NOT EXISTS 'innosci_app'@'%' IDENTIFIED BY 'I4Dp8eqZrnowUbX2Cxmk';
   ALTER USER 'innosci_app'@'%' IDENTIFIED BY 'I4Dp8eqZrnowUbX2Cxmk';
   GRANT SELECT, INSERT, UPDATE, DELETE ON innosci.* TO 'innosci_app'@'%';
   FLUSH PRIVILEGES;