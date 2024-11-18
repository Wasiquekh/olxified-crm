import CryptoJS from 'crypto-js';

class StorageManager {
  constructor() {
    this.cacheKeys = {
      userEmail: 'userEmail',
      userMobile: 'userMobile',
      userSecretKey: 'userSecretKey',
      accessToken: 'accessToken',
    };
  }

  async saveUserEmail(email) {
    localStorage.setItem(this.cacheKeys.userEmail, email);
    return true;
  }

  getUserEmail() {
    return localStorage.getItem(this.cacheKeys.userEmail);
  }

  async removeUserEmail() {
    localStorage.removeItem(this.cacheKeys.userEmail);
  }

  async saveUserMobile(mobile) {
    localStorage.setItem(this.cacheKeys.userMobile, mobile);
    return true;
  }

  getUserMobile() {
    return localStorage.getItem(this.cacheKeys.userMobile);
  }

  async removeUserMobile() {
    localStorage.removeItem(this.cacheKeys.userMobile);
  }

  getAccessToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.accessToken);
    }
    return null; // Return null or a default value for SSR
  }

  async saveAccessToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cacheKeys.accessToken, token);
    }
  }

  async removeAccessToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.accessToken);
    }
  }

  async saveUserSecretKey(secretKey) {
    const encryptedData = CryptoJS.AES.encrypt(secretKey, "secret_key").toString();
    localStorage.setItem(this.cacheKeys.userSecretKey, encryptedData);
    return true;
  }

  getUserSecretKey() {
    return localStorage.getItem(this.cacheKeys.userSecretKey);
  }

  async removeUserSecretKey() {
    localStorage.removeItem(this.cacheKeys.userSecretKey);
  }

    // Method to decrypt and retrieve the user secret key
    getDecryptedUserSecretKey() {
      const encryptedData = this.getUserSecretKey();
      if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
        return bytes.toString(CryptoJS.enc.Utf8);
      }
      return "";
    }

  async resetAll() {
    Object.values(this.cacheKeys).forEach(key => localStorage.removeItem(key));
  }
}

export default StorageManager;
