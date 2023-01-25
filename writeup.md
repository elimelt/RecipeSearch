# Recipe Search

## GitHub-Pages URL

[https://elimelt.github.io/RecipeSearchProduction/](https://elimelt.github.io/RecipeSearchProduction/).

## API

 [TheMealDB API](https://themealdb.com/api.php) API was used for this project because it offers a public API key for development, making it easy to start using without the need to register for anything. The API allows users to search for recipes by ingredients and retrieve detailed information about the recipe, such as instructions, ingredients, and a photo of the finished dish.

## Other Applications

The free version of TheMealDB API is read-only, but by paying a small fee, users can access the beta version which allows them to post new meals to the database and filter by multiple ingredients. 

Using the paid version, applications other than searching include using it in a grocery list and meal planning app that suggests recipes based on the ingredients the user has on hand. You can let the user submit their own meals and use the API to request the meal information and data.


## Responsive & Mobile-Friendly Design

The app was designed to be responsive and mobile-friendly using Bootstrap. This allows the layout to automatically scale for different views, ensuring that the user experience is consistent across different devices and screen sizes.

I decided to design the layout so that the tiles that have meal information take up most of the screen on a mobile veiwport, and are organized in a grid on a desktop viewport. I centered everything so that it looks consitent on all screen sizes.



## Accessibility

To increase the accessability of my app, I would offer customization of the display in terms of color choices and contrast. I would store the user's specified options using cookies to ensure they don't have to repeatedly select their prefered settings.

Additionally, I would make my HTML more semantic and add aria- attributes to provide additional information about elements for screen readers. For example, using aria-label attribute on my meal tiles, or even switching them from a div element to a button element would make it clear that they are clickable.

## Future Improvmenets 

Some improvements I would make include adding a default image for missing meal pictures in the database. Also, as mentioned previously, I can increase the accesability of the site by letting users customize the color theme user settings stored in cookies. Furthermore, I can improve the organization of my code by implementing more logic on the back end. When I first started this project, I solved CORS by using an Express server to add a header to all the API calls. I originally intended to just host my site on github pages, so I didnt build any more functionality into the backend. Now that I hosted a backend anyways, I can preprocess the data returned by the API to simplify the code for my front end.

