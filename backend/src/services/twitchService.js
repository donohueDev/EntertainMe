//file was used to fetch twitch access token from twitch api 
import dotenv from 'dotenv'; // To load environment variables
import axios from 'axios';
dotenv.config();

async function getTwitchAccessToken() {
  // get necessary variables from .env file
  const { TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET } = process.env;

  console.log('Client ID:', TWITCH_CLIENT_ID);
  console.log('Client Secret:', TWITCH_CLIENT_SECRET);
  // try to retrieve access_token from api
  try {
    const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
        client_id: TWITCH_CLIENT_ID,
        client_secret: TWITCH_CLIENT_SECRET,
        grant_type: 'client_credentials'
      }
    });

    const accessToken = response.data.access_token;
    console.log('Access Token:', accessToken);

    return accessToken; // Return token for use in other requests
  } catch (error) {
    console.error('Error fetching access token:', error.response ? error.response.data : error.message);
  }
}

// Export the function correctly
export { getTwitchAccessToken };
