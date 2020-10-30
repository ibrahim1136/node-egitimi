# Movies
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/movies | `GET` | Empty | List all movies. |
| /api/movies | `POST` | {'title':'foo', 'category':'bar', 'country':'Turkey', year:1990 } | Create a new movie. |
| /api/movies/:movie_id | `GET` | Empty | Get a movie. |
| /api/movies/:movie_id | `PUT` | {'name':'foo', 'surname':'bar'} | Update a movie with new info. |
| /api/movies/:movie_id | `DELETE` | Empty | Delete a movie. | 
# Directors
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /api/directors | `GET` | Empty | List all directors. |
| /api/directors | `POST` | { name: 'foo', surname:'bar', bio:'lorem ipsum' } | Create a new director. |
| /api/directors/:director_id | `GET` | Empty | Get a director. |
| /api/directors/:director_id | `DELETE` | Empty | Delete a director. |
 
# Index
 
| Route | HTTP Verb | POST body | Description |
| --- | --- | --- | --- |
| /register | `POST` | { name: 'foo', password:'1234' } | Create a new user. |
| /authenticate | `POST` | { name: 'foo', password:'1234' } | Generate a token. |


# node-egitimi
