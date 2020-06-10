# picto-plots
 Movie Guessing Game

The game is implemented with html and javascript, using a movie class and an images class in order to keep both fetch methods seperate and synchronous.

You can edit, add or subtract from the movie list by simply updating the movielist object, just be sure to go on IMDB to find the ID. This could be rewritten to only use the movie title to call data, but it made sense to use the ID, since I knew that the movie IDs would probably never change.

Once the movie plot is loaded, the cleanPlot() method takes out all unncecessary words, in an effort to keep the amount of rejected image request down as well as make it easier to guess the movies.

I've also added the keyword used to call each image into the title tag, so that users can hover over them for a hint.

Other features I thought could be implemented in the future:
1. A reset button, so that the user doesn't need to reload the page after each guess
2. Mosaic tiling - the images are all different sizes, so having them fit together better would be an upgrade
3. Slider instead of tiling -- the user may not know they need to read the images top/down, left/write in order to make more sense out of the quiz.
4. Chain the API calls better so I don't have to use setTimeout functions
