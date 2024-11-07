
class StorageManager {
    constructor() {
      this.cacheKeys = {
        userEmail: 'userEmail',
        userMobile: 'userMobile'
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
  
    async resetAll() {
      Object.values(this.cacheKeys).forEach(key => localStorage.removeItem(key));
    }
  }
  
  export default StorageManager;
  