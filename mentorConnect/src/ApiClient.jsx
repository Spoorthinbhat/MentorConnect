// // This is the Auth token, you will use it to generate a meeting and connect to it
// export const authToken = "208abf33-28c8-4802-bfee-b32ae4183354";

// // API call to create a meeting
// export const createMeeting = async () => {
//   const res = await fetch(`https://api.videosdk.live/v2/rooms`, {
//     method: "POST",
//     headers: {
//       Authorization: `Bearer ${authToken}`,
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({}),
//   });

//   // Destructuring the roomId from the response
//   const { roomId } = await res.json();
//   return roomId;
// };
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
