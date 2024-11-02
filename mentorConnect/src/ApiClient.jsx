
const LOCAL_SERVER_URL = "http://localhost:9000";

export const getToken = async () => {
  try {
    const response = await fetch(`${LOCAL_SERVER_URL}/get-token`, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    const { token } = await response.json(); // Fixed typo here
    return token;
  } catch (e) {
    console.error("Error fetching token:", e);
  }
};

export const getMeetingId = async (token) => {
  try {
    const VIDEOSDK_API_ENDPOINT = `${LOCAL_SERVER_URL}/create-meeting`;
    const response = await fetch(VIDEOSDK_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ token }),
    });
    const { meetingId } = await response.json();
    return meetingId;
  } catch (e) {
    console.error("Error fetching meeting ID:", e);
  }
};
