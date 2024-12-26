class UserActivityLogger {
    constructor(axiosProvider, storage) {
        this.axiosProvider = axiosProvider;
        this.userId = storage.getUserId(); 
        this.userName = storage.getUserName();
      }
  
      async log(activity) {
        try {
          await this.axiosProvider.post("/loguseractivity", {
            userId: this.userId,
            activity: `${this.userName} ${activity}`,
          });
          console.log("User activity logged successfully");
        } catch (error) {
          console.error("Failed to log user activity:", error);
          throw error;  // Re-throw if needed
        }
      }
    
      async userLogin() {
        await this.log("Login");
      }
  }
  
  export default UserActivityLogger;
  