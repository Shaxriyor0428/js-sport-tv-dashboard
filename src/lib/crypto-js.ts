import CryptoJS from "crypto-js";

const SECRET_KEY = "jsporttv-secret-key";

const encrypt = (text: string) => {
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return encodeURIComponent(ciphertext);
};

export { encrypt }