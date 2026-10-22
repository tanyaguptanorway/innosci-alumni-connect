INSERT INTO spotlight (title, alumni_name, summary, sort_order) VALUES
  ('Sample story 1', 'Sample Alumnus One', 'Replace with your podcast summary.', 1),
  ('Sample story 2', 'Sample Alumnus Two', 'Replace with your podcast summary.', 2);

INSERT IGNORE INTO users (user_id, email, full_name, graduation_year, program, status) VALUES
  ('demo-1', 'alum1@example.com', 'Demo Alumna 1', 2019, 'Computer Science', 'APPROVED'),
  ('demo-2', 'alum2@example.com', 'Demo Alumnus 2', 2022, 'Data Science', 'PENDING');