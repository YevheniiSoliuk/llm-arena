import { CONFIG } from "@/config";
import axios from "axios";

const AUTH0_TOKEN_BASE_URL = `https://${CONFIG.AUTH0_DOMAIN}/oauth/token`;
const AUTH0_BASE_URL = `https://${CONFIG.AUTH0_DOMAIN}/api/v2/`;

export const AUTH0_API = (accessToken: string) => axios.create({
  baseURL: AUTH0_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json",
  },
});

const getM2MToken = async () => {
  const { data } = await axios.post(AUTH0_TOKEN_BASE_URL, {
    grant_type: "client_credentials",
    client_id: `${CONFIG.AUTH0_CLIENT_ID}`,
    client_secret: `${CONFIG.AUTH0_CLIENT_SECRET}`,
    audience: AUTH0_BASE_URL,
  }, {
    headers: {
      "content-type": "application/json",
    }
  })

  return data["access-token"];
};

export const sendEmailVerification = async (userId: string) => {
  const accessToken = await getM2MToken();

  await AUTH0_API(accessToken).post('jobs/verification-email', {
    user_id: userId,
    client_id: CONFIG.AUTH0_CLIENT_ID,
  });
}