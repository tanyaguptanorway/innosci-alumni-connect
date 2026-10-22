CREATE TABLE IF NOT EXISTS users (
  user_id         VARCHAR(64) PRIMARY KEY,
  email           VARCHAR(255) NOT NULL UNIQUE,
  full_name       VARCHAR(150) NOT NULL,
  graduation_year SMALLINT,
  program         VARCHAR(150),
  linkedin_url    VARCHAR(255),
  skills          VARCHAR(500),
  bio             TEXT,
  role            ENUM('ALUMNI','ADMIN') NOT NULL DEFAULT 'ALUMNI',
  status          ENUM('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX idx_status (status),
  INDEX idx_year (graduation_year)
);

CREATE TABLE IF NOT EXISTS spotlight (
  slide_id    INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(200) NOT NULL,
  alumni_name VARCHAR(150),
  summary     TEXT,
  image_url   VARCHAR(500),
  podcast_url VARCHAR(500),
  sort_order  TINYINT NOT NULL DEFAULT 0
);