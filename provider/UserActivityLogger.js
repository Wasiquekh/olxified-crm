import StorageManager from "./StorageManager";
import AxiosProvider from "./AxiosProvider";

const storage = new StorageManager();
const axiosProvider = new AxiosProvider();

const userId = storage.getUserId();
const userName = storage.getUserName();

class UserActivityLogger {
    // constructor(axiosProvider, storage) {
    //     this.axiosProvider = axiosProvider;
    //     this.userId = storage.getUserId(); 
    //     this.userName = storage.getUserName();
    //   }
  
      async log(activity, module, type) {
        try {
          await axiosProvider.post("/loguseractivity", {
            userId: userId,
            activity: `${userName} ${activity}`,
            module:module,
            type:type,
          });
         // console.log("User activity logged successfully");
        } catch (error) {
          console.error("Failed to log user activity:", error);
          throw error;  // Re-throw if needed
        }
      }
    
      async userLogin() {
        await this.log("Login","System","login");
      }
      async userRegister(userId){
        await this.log(`Registered a user #${userId},'',''`);
      }
      async userUpdate(userId){
        await this.log(`Update user #${userId}`,'User Managemenet','Update');
      }
      async userDelete(userId) {
        await this.log(`Delete user #${userId}`,'User Managemenet','Delete');
    }

  }
  
  export default UserActivityLogger;
  