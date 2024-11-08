importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js"
);

const firebaseConfig = {
  apiKey: "AIzaSyAhkd3kt91KiPEkWKFXfiNlTLMbtMQ6QDY",
  authDomain: "fitnee-599e6.firebaseapp.com",
  projectId: "fitnee-599e6",
  storageBucket: "fitnee-599e6.appspot.com",
  messagingSenderId: "656320859335",
  appId: "1:656320859335:web:90ecc985a07ec6ae5302e2",
  measurementId: "G-VY7M0GFXTL",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  // const body = JSON.parse(payload.notification.body);
  // const title = JSON.parse(payload.notification.title);

  // const notificationOptions = {
  //   body: body.msg,
  // };

  // self.registration.showNotification(title.title_en, notificationOptions);
});
