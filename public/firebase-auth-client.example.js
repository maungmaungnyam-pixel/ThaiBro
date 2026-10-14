(() => {
  const firebaseConfig = Object.freeze({
    apiKey: "YOUR_FIREBASE_WEB_API_KEY",
    authDomain: "YOUR_FIREBASE_AUTH_DOMAIN",
    projectId: "YOUR_FIREBASE_PROJECT_ID",
    appId: "YOUR_FIREBASE_APP_ID"
  });
  const sdkBase = "https://www.gstatic.com/firebasejs/13.0.0";

  window.ThaiBroFirebaseAuthPromise = (async () => {
    const [appSdk, authSdk] = await Promise.all([
      import(`${sdkBase}/firebase-app.js`),
      import(`${sdkBase}/firebase-auth.js`)
    ]);
    const app = appSdk.initializeApp(firebaseConfig);
    const auth = authSdk.getAuth(app);

    await new Promise((resolve, reject) => {
      let unsubscribe = () => {};
      let settled = false;
      unsubscribe = authSdk.onAuthStateChanged(auth, () => {
        if (settled) return;
        settled = true;
        unsubscribe();
        resolve();
      }, (error) => {
        if (settled) return;
        settled = true;
        unsubscribe();
        reject(error);
      });
    });

    return { auth, ...authSdk };
  })();
})();
