# BDMI

[Heroku link][heroku]

[heroku]:www.bdmi.co

## Minimum Viable Product
BDMI is a clone of IMDB built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] View movies info and grades
- [x] View casts
- [x] View reviews
- [x] Add reviews to movie
- [x] Grade movies
- [x] Play trailers
- [x] Search for movies by title
- [x] View persons Info
- [x] View persons' attended movies
- [x] Search for persons by name
- [x] Add movie to personal watch list
- [x] Record watched movies


## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Movie Index Page (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. By the end of this phase, users will be able to comment movies using
a simple text form in a Rails view. The most important part of this phase will
be pushing the app to Heroku and ensuring that everything works before moving on
to phase 2.

[Details][phase-one]

### Phase 2: Viewing Movie Info and Adding Reviews (~4 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to view a list of movies and their grades, or view
movies castings, add reviews, and grade the movie in its show page inside a
single Backbone app.

[Details][phase-two]

### Phase 3: Search (~3 days)
I'll need to add `search` routes to Movies and actors controllers. On the
Backbone side, there will be a `SearchResults` composite view has `MoviesIndex`
subviews and `ActorIndex` subviews.

[Details][phase-three]

### Phase 4: Play trailer and personal list(~2 days)
I'll use YouTube api to embed YouTube player and play trailer in movie's show
page. I'll have a user homepage which contains `UserReviews`, `UserWatchList`,
and `UserWatchedList` subviews to display the information that the user stored
in the app.

[Details][phase-four]


### Bonus Features (TBD)
- [x] "Watched" button and "Would Watch" button
- [x] Pagination/infinite scroll
- [ ] Multiple sessions/session management
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
