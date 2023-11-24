CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE folders (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT,
    folder_name VARCHAR(255) NOT NULL,
    access_type VARCHAR(255) NOT NULL,
    CONSTRAINT fk_user_id FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE files (
    id INT PRIMARY KEY AUTO_INCREMENT,
    folder_id INT,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(255) NOT NULL,
    access_type VARCHAR(255) NOT NULL,
    upload_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_folder_id FOREIGN KEY (folder_id) REFERENCES folders(id)
);
