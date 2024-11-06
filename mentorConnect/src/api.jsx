const API_BASE_URL = "https://api.videosdk.live";
// const VIDEOSDK_TOKEN = process.env.REACT_APP_VIDEOSDK_TOKEN;
const VIDEOSDK_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlrZXkiOiJhZWE0MzhmMi1iMzM3LTRkZjQtOTFmYS1lNjM0MjY3NWRlYjgiLCJwZXJtaXNzaW9ucyI6WyJhbGxvd19qb2luIl0sImlhdCI6MTczMDcyMDAyMCwiZXhwIjoxNzMxMzI0ODIwfQ.qEpXtnGeiVgYrUxdgp7whh4YkcU9Pz6JOZ2B802Cs_0";
// const API_AUTH_URL = process.env.REACT_APP_AUTH_URL;

export const getToken = async () => {
  if (VIDEOSDK_TOKEN) {
    console.error(
      "Error: Provide only ONE PARAMETER - either Token or Auth API"
    );
  } else if (VIDEOSDK_TOKEN) {
    return VIDEOSDK_TOKEN;
  } else {
    console.error("Error: ", Error("Please add a token or Auth Server URL"));
  }
};

export const createMeeting = async () => {
  const url = `${API_BASE_URL}/v2/rooms`;
  const options = {
    method: "POST",
    headers: { Authorization: VIDEOSDK_TOKEN, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  if (data.roomId) {
    return { meetingId: data.roomId, err: null };
  } else {
    return { meetingId: null, err: data.error };
  }
};

export const validateMeeting = async ({ roomId, token }) => {
  const url = `${API_BASE_URL}/v2/rooms/validate/${roomId}`;

  const options = {
    method: "GET",
    headers: { Authorization: token, "Content-Type": "application/json" },
  };

  const response = await fetch(url, options);

  if (response.status === 400) {
    const data = await response.text();
    return { meetingId: null, err: data };
  }

  const data = await response.json();

  if (data.roomId) {
    return { meetingId: data.roomId, err: null };
  } else {
    return { meetingId: null, err: data.error };
  }
};
