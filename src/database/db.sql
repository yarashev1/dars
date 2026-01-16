CREATE DATABASE youtube;
create TABLE "users"(
    "id" serial PRIMARY key,
    "username" varchar(255) not null,
    "password"varchar(255) not null,
    "avatar" text not null

);
 create table "files"(
    "id" serial not null,
    "title" varchar(255) not null,
    "file_name" varchar(255) not null,
    "suzi" integer not null,
    "user_id" int REFERENCES users(id)  on delete  CASCADE,
    "created_at" TIMESTAMP DEFAULT(CURRENT_TIMESTAMP)
 );