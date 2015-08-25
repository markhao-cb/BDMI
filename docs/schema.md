# Schema Information

## movies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
title       | string    | not null
release date| date      |
vote_average| float     |
vote_count  | integer   |
popularity  | float     |
revenue     | integer   |
runtime     | integer   |
budget      | integer   |
tagline     | string    |
overview    | text      |
imdb_id     | string    |


## posters
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
poster_url  | string    | not null


## castings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
actor_id    | integer   | not null, foreign key (references actors)
act_as      | string    |
ordering    | integer   |


## genres
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
name        | string    | not null


## images
column name   | data type | details
--------------|-----------|-----------------------
id            | integer   | not null, primary key
image_url     | string    | not null
thumbnil_url  | string    |
imageable_id  | integer   |
imageable_type| string    |


## trailers
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
source         | string    | not null
movie_id       | integer   | not null, foreign key (references movies)


## actors
column name    | data type | details
---------------|-----------|-----------------------
id             | integer   | not null, primary key
name           | string    | not null
place_of_birth | string    |
birthday       | date      |
biography      | text      |

## reviews
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users)
movie_id    | integer   | not null, foreign key (references movies)
title       | string    | not null
body        | string    |
grade       | integer   |

## taggings
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
genre_id    | integer   | not null, foreign key (references genres)


## wantwatchmovies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
user_id     | integer   | not null, foreign key (references users)


## watchedmovies
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
movie_id    | integer   | not null, foreign key (references movies)
user_id     | integer   | not null, foreign key (references users)


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
email           | string    | not null, unique
username        | string    | not null, unique
password_digest | string    | not null
session_token   | string    | not null, unique
