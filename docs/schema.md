# Schema Information

## movies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
release date| date      | not null, default "coming soon"
grade       | integer   | not null, default 0

## castings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
actor_id    | integer   | not null, foreign key (references actors)
ordering    | integer   | not null, default 3

## actors
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null
gender      | string    | not null

## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
movie_id    | integer   | not null, foreign key (references movies)
title       | string    | not null
body        | string    |
grade       | integer   |

## tags
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
label       | string    | not null

## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
