-- Active: 1663296944663@@35.226.146.116@3306@hooks-4313245-diogo-bomfim
CREATE TABLE Todo_users (
    id VARCHAR(255) PRIMARY KEY,
    first_name VARCHAR(40) NOT NULL,
    last_name VARCHAR(40),
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(100) NOT NULL
);

CREATE TABLE Todo_workspaces (
    id VARCHAR(255) PRIMARY KEY,
    id_user VARCHAR(255) NOT NULL,
    name VARCHAR(40) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES Todo_users(id)
);

CREATE TABLE Todo_tasks (
    id VARCHAR(255) PRIMARY KEY,
    id_user VARCHAR(255) NOT NULL,
    title VARCHAR(40) NOT NULL,
    description VARCHAR(255) NOT NULL,
    id_workspace VARCHAR(255) NOT NULL,
    status ENUM("TO_DO", "IN_PROGRESS", "COMPLETED") DEFAULT("TO_DO"),
    FOREIGN KEY (id_workspace) REFERENCES Todo_workspaces(id),
    FOREIGN KEY (id_user) REFERENCES Todo_users(id)
);