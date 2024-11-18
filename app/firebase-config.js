import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBW28crGu2Y3mLan4T5WI1D4IAVbiYTK3k",
  authDomain: "orizon-mobile-dev.firebaseapp.com",
  projectId: "orizon-mobile-dev",
  storageBucket: "orizon-mobile-dev.appspot.com",
  messagingSenderId: "671207924673",
  appId: "1:671207924673:web:7e6e14cd8fdef5294a0540",
  measurementId: "G-110CJEPPMR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

let appCheck; // Declare appCheck outside to export later

if (typeof window !== 'undefined') {
  // Only run the Firebase App Check initialization on the client
  appCheck = initializeAppCheck(app, {
    provider: new ReCaptchaV3Provider("6LeNlSAqAAAAAGbgvmjfMsR2zwWpGCFL4RqDg9uE"),
    container: "recaptcha-container-id", // Provide the id of a DOM element
    isTokenAutoRefreshEnabled: true,
  });
}

export { app, appCheck };