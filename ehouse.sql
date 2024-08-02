CREATE TABLE User (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE,
    avatar VARCHAR(255),
    role ENUM('ADMIN', 'LANDLORD', 'TENANT') NOT NULL,
	is_active BOOLEAN DEFAULT FALSE
);

CREATE TABLE Landlord (
	id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(15),
	province INT,
	district INT,
    ward INT,
	street NVARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES User(id)
);
CREATE TABLE TypeImage(
	id INT AUTO_INCREMENT PRIMARY KEY,
     type ENUM('ROW', 'ROOM') NOT NULL
);

CREATE TABLE ImageProfile(
	id INT AUTO_INCREMENT PRIMARY KEY,
	 user_id INT NOT NULL,
	 image VARCHAR(255) NOT NULL,
     type_id INT NOT NULL,
     FOREIGN KEY (user_id) REFERENCES User(id),
     FOREIGN KEY (type_id) REFERENCES TypeImage(id)
	
);




CREATE TABLE Room (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    max_occupants INT,
    price VARCHAR(50),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Image (
    id INT AUTO_INCREMENT PRIMARY KEY,
	room_id INT NOT NULL,
    image VARCHAR(255) NOT NULL,
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

CREATE TABLE Post (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE LandlordPost (
	id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL UNIQUE,
    room_id INT NOT NULL UNIQUE,
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (room_id) REFERENCES Room(id)
);

CREATE TABLE TenantPost (
	id INT AUTO_INCREMENT PRIMARY KEY,
	post_id INT NOT NULL UNIQUE,
    address VARCHAR(255),
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    FOREIGN KEY (post_id) REFERENCES Post(id)
);

CREATE TABLE Comment (
    id INT AUTO_INCREMENT PRIMARY KEY,
    post_id INT NOT NULL,
    user_id INT NOT NULL,
    content TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (post_id) REFERENCES Post(id),
    FOREIGN KEY (user_id) REFERENCES User(id)
);

CREATE TABLE Follow (
    id INT AUTO_INCREMENT PRIMARY KEY,
    follower_id INT NOT NULL,
    landlord_id INT NOT NULL,
    followed BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (follower_id) REFERENCES User(id),
    FOREIGN KEY (landlord_id) REFERENCES User(id),
    UNIQUE (follower_id, landlord_id),
    CONSTRAINT unique_follower_landlord UNIQUE (follower_id, landlord_id)
);






