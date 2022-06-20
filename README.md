# Schulze-API

This is an electoral system REST API hosted on [https://schulzeapi.herokuapp.com/](https://schulzeapi.herokuapp.com/). It based on [Schulze method](
https://en.wikipedia.org/wiki/Schulze_method) of voting.

## Verification

Use this link [https://schulzeapi.herokuapp.com/hi](https://schulzeapi.herokuapp.com/hi) to verify the working of the API.

## Usage

**Request:**
```
GET /getResult HTTP/1.1
Accept: application/json
Content-Type: application/json

{
    "candidates": ["A", "B", "C", "D", "E" ......],
    "ballots" :[
                [2, 2, 2, 1, 2],
                [1, 1, 2, 3, 3],
                 .
                 .
                 .
                 .
               ]
}
```
**Successful Response:**
```
HTTP/1.1 200 OK

[["A","B"],["C","D"],["E"],......]
```
**Failed Response:**
```
HTTP/1.1 400
``` 

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
