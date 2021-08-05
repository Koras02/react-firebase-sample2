import firebase from "firebase/app";
import "firebase/auth"

// .env.local 에 저장한 정보 불러오기
// firebase 생성자에 모든 정보 저장
const app = firebase.initializeApp({
    apiKey: "AIzaSyDsCGra5Bv0FnyU3MpN-ocxYgObzvbLNgE",
    authDomain: "react-firebase-routing.firebaseapp.com",
    projectId: "react-firebase-routing",
    storageBucket: "react-firebase-routing.appspot.com",
    messagingSenderId: "8736831470",
    appId: "1:8736831470:web:edae272aef7884c74f40ff",
    measurementId: "G-Z2HSHWGL8E"
})

// 인증을위한 변수를 성정 
export const auth = app.auth();
export default app;