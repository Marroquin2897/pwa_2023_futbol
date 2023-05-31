importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.1/firebase-messaging-compat.js');

const firebaseConfig = {
  apiKey: 'TU_API_KEY',
  authDomain: 'TU_AUTH_DOMAIN',
  projectId: 'TU_PROJECT_ID',
  storageBucket: 'TU_STORAGE_BUCKET',
  messagingSenderId: 'TU_SENDER_ID',
  appId: 'TU_APP_ID',
  measurementId: 'TU_MEASUREMENT_ID'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

// Configurar la recepción de notificaciones en segundo plano
messaging.onBackgroundMessage((payload) => {
  console.log('Recibiste un mensaje mientras estabas ausente:', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/icono2-burrito.png'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});