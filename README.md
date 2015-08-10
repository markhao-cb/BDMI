# BDMI

[Heroku link][heroku]

[heroku]:

## Minimum Viable Product
BDMI is a clone of IMDB built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] View movies info and grades
- [x] View comments
- [x] Add comments to movie
- [x] Grade movies
- [x] Add rank system
- [x] Search for movies by title
- [ ] Add replies to comments
- [ ] Play trailers
- [ ] Movie recommendations

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

### Phase 2: Viewing Movie Info and Adding Comments (~2 days)
I will add API routes to serve blog and post data as JSON, then add Backbone
models and collections that fetch data from those routes. By the end of this
phase, users will be able to view a list of movies and their grades, or view
movies castings, add comments, and grade the movie in its show page inside a
single Backbone app.

[Details][phase-two]

### Phase 3: Searching for Movies by title (~1 days)
I'll need to add `search` routes to Movies controllers. On the
Backbone side, there will be a `SearchResults` composite view has `MoviesIndex`
subviews. I'll have a movie rank system based on the users grade. Users will be
able to view the rank of all movies or based on their type tag.

[Details][phase-three]

### Phase 4: Ranking System (~1 days)
I'll have a movie rank system based on the users grade. Users will be
able to view the rank of all movies or based on their tags.

[Details][phase-four]


### Bonus Features (TBD)
- [ ] "Watched" button and "Would Watch" button
- [ ] Pagination/infinite scroll
- [ ] Multiple sessions/session management
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
