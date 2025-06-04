# 🌌 Crazy Swapi API

A serverless API that fuses Star Wars data with weather and custom user input to generate creative "fusions". Built on AWS using Node.js, DynamoDB, and third-party APIs (SWAPI & Open Meteo).

---

## 📌 Endpoints

### 1. `POST /store` - Create a Custom Fusion

**Description:**  
Stores a user-defined fusion in the database with custom attributes like name, species, gender, age, and description.

**Request Body:**

```json
{
  "custom": {
    "name": "Zarnok",
    "species": "Cyborg",
    "gender": "non-binary",
    "age": 217,
    "description": "An ancient force user fused with machinery."
  }
}
```
**Response:**

```json
{
  "id": "fabc123",
  "creationDate": 1728163800,
  "lastUpdateDate": 1728163800,
  "custom": {
    "name": "Zarnok",
    "species": "Cyborg",
    "gender": "non-binary",
    "age": 217,
    "description": "An ancient force user fused with machinery."
  }
}

```

---

### 2. `GET /fusion` - Get Random Fusion

**Description:**  
Fetches a fusion of a random Star Wars character and their planet, enriched with real-time weather data based on the planet’s location.

**Response (sample):**

```json
{
  "id": "fusion123",
  "creationDate": 1728163800,
  "lastUpdateDate": 1728163800,
  "character": {
    "code": "1",
    "name": "Luke Skywalker",
    "height": "172",
    "mass": "77",
    "gender": "male",
    "homeworld": "Tatooine"
  },
  "planet": {
    "url": "https://swapi.info/api/planets/1/",
    "name": "Tatooine",
    "population": "200000",
    "diameter": "10465",
    "gravity": "1 standard",
    "terrain": "desert"
  },
  "weather": {
    "latitude": 35.0,
    "longitude": -115.0,
    "elevation": 200,
    "time": "2025-06-03T21:00:00Z",
    "temperature": "36.5",
    "windspeed": "15",
    "winddirection": "180"
  }
}

```

---

### 3. `GET /history` - List All Fusions

**Description:**  
 Retrieves a paginated list of all fusion records (custom or random).


**Response (sample):**

```json

{
  "nextToken": "base64-token",
  "items": [
    {
      "id": "fusion123",
      "creationDate": 1728163800,
      "lastUpdateDate": 1728163800,
      "character": { ... },
      "planet": { ... },
      "weather": { ... },
      "custom": { ... }
    }
  ]
}

```


---

### 🚀 Deployment

This project uses Serverless Framework with TypeScript.

1. Install dependencies: `npm install`
2. Build: `npm run build`
3. Run tests: `npm run test`
4. Deploy: `npx serverless deploy`