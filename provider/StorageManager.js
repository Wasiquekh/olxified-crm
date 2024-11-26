import CryptoJS from 'crypto-js';

class StorageManager {
  constructor() {
    this.cacheKeys = {
      userEmail: 'userEmail',
      userMobile: 'userMobile',
      userSecretKey: 'userSecretKey',
      accessToken: 'accessToken',
      userId: 'userId',
    };
  }

  async saveUserEmail(email) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cacheKeys.userEmail, email);
      return true;
    }
    throw new Error("localStorage is not available");
  }

  getUserEmail() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.userEmail);
    }
    return null;
  }

  async removeUserEmail() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.userEmail);
    }
  }

  async saveUserMobile(mobile) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cacheKeys.userMobile, mobile);
      return true;
    }
    throw new Error("localStorage is not available");
  }

  getUserMobile() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.userMobile);
    }
    return null;
  }

  async removeUserMobile() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.userMobile);
    }
  }

  async saveUserId(userId) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cacheKeys.userId, userId);
      return true;
    }
    throw new Error("localStorage is not available");
  }

  getUserId() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.userId);
    }
    return null;
  }

  async removeUserId() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.userId);
    }
  }

  getAccessToken() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.accessToken);
    }
    return null;
  }

  async saveAccessToken(token) {
    if (typeof window !== "undefined") {
      localStorage.setItem(this.cacheKeys.accessToken, token);
      return true;
    }
    throw new Error("localStorage is not available");
  }

  async removeAccessToken() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.accessToken);
    }
  }

  async saveUserSecretKey(secretKey) {
    if (typeof window !== "undefined") {
      const encryptedData = CryptoJS.AES.encrypt(secretKey, "secret_key").toString();
      localStorage.setItem(this.cacheKeys.userSecretKey, encryptedData);
      return true;
    }
    throw new Error("localStorage is not available");
  }

  getUserSecretKey() {
    if (typeof window !== "undefined") {
      return localStorage.getItem(this.cacheKeys.userSecretKey);
    }
    return null;
  }

  async removeUserSecretKey() {
    if (typeof window !== "undefined") {
      localStorage.removeItem(this.cacheKeys.userSecretKey);
    }
  }

  getDecryptedUserSecretKey() {
    if (typeof window !== "undefined") {
      const encryptedData = this.getUserSecretKey();
      if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, "secret_key");
        return bytes.toString(CryptoJS.enc.Utf8);
      }
    }
    return "";
  }

  async resetAll() {
    if (typeof window !== "undefined") {
      Object.values(this.cacheKeys).forEach(key => localStorage.removeItem(key));
    }
  }
}

export default StorageManager;
