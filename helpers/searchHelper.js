export const getUserInfo = async (token, user_id) => {
  const get_url = "https://api.intra.42.fr/v2/users/" + user_id;

  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(get_url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
      });
      let json = await response.json();
      resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getUserId = async (token) => {
  let filter = login.toLowerCase();
  filter = filter.trim();
  const get_url = "https://api.intra.42.fr/v2/users?filter[login]=" + filter;

  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch(get_url, {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
      });
      let json = await response.json();
      resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const getToken = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch("https://api.intra.42.fr/oauth/token", {
        method: "POST",
        body: JSON.stringify(POST_body),
        headers: {
          "Content-Type": "application/json",
        },
      });
      let json = await response.json();
      resolve(json.access_token);
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });
};

export const getTokenInfo = (token) => {
  return new Promise(async (resolve, reject) => {
    try {
      let response = await fetch("https://api.intra.42.fr/oauth/token/info", {
        method: "GET",
        headers: new Headers({
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        }),
      });
      let json = await response.json();
      resolve(json);
    } catch (error) {
      console.error(error);
      reject(error);
    }
  });
};

export const verifyToken = () => {
  const [token, setToken] = useState("");

  return new Promise(async (resolve, reject) => {
    try {
      let check;
      if (token != "") {
        check = await getTokenInfo(token);
        if (check.expires_in_seconds > 0) {
          resolve(token);
        }
      }
      if (token == "" || check.expires_in_seconds == undefined) {
        const new_token = await getToken();
        setToken(new_token);
        resolve(new_token);
      }
      resolve(0);
    } catch (err) {
      console.log(err);
      reject(-1);
    }
  });
};
