# Bor3y MCP Server

## Usage

1. **Install dependencies**  
   Run `npm install` to install required packages.

2. **Configure environment variables**  
   Create a `.env` file in the project root and set your configuration values.

3. **Start the server**  
   Run `npm start` or `node index.js` (replace `index.js` with your entry file if different).

4. **Access the MCP server**  
   The server will start on the configured port. Use API clients or browser to interact with the endpoints as documented in your project.

## Environment Variables

To save configuration values such as API URLs or secret keys, use a `.env` file in the project root.

### Example: Saving a value in `.env`

```
API_HOST=https://host-example/
```

You can then access this value in your code using:

```js
process.env.API_HOST;
```

Make sure to install the `dotenv` package and call `dotenv.config()` at the top of your entry file to load environment variables.
