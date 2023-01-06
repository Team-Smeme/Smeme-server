import axios from "axios";
import { status } from "../constants";

const signKakaoUser = async (socialToken: string) => {
  try {
    const user = await axios({
      method: "GET",
      url: "https://kapi.kakao.com/v2/user/me",
      headers: {
        Authorization: `Bearer ${socialToken}`,
      },
    });

    if (!user) {
      throw status.UNAUTHORIZED;
    }
    return user.data;
  } catch (err) {
    throw status.UNAUTHORIZED;
  }
};

export default {
  signKakaoUser,
};
