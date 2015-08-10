# Phase 2: Viewing Movie Info and Adding Comments

## Rails
### Models

### Controllers
Api::CommentsController (create, destroy, show, update)

### Views
* movies/show.json.jbuilder

## Backbone
### Models
* Movie (parses nested `comments` association)
* Comment

### Collections
* Comments

### Views
* CommentForm
* MovieShow (composite view, contains CommentsIndex subview)
* CommentsIndex (composite view, contains CommentsIndexItem subviews)
* CommentsIndexItem

## Gems/Libraries
