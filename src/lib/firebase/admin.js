import admin from 'firebase-admin';

if (!admin.apps.length) {
  try {
    let credential;

    // Opción 1: JSON completo (preferida para producción)
    if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
      const serviceAccount = JSON.parse(
        process.env.FIREBASE_SERVICE_ACCOUNT_KEY
      );
      credential = admin.credential.cert(serviceAccount);
      console.log('✅ Usando FIREBASE_SERVICE_ACCOUNT_KEY');
    }
    // Opción 2: Variables separadas (fallback para desarrollo)
    else if (
      process.env.FIREBASE_ADMIN_PROJECT_ID &&
      process.env.FIREBASE_ADMIN_CLIENT_EMAIL &&
      process.env.FIREBASE_ADMIN_PRIVATE_KEY
    ) {
      credential = admin.credential.cert({
        projectId: process.env.FIREBASE_ADMIN_PROJECT_ID,
        clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      console.log('✅ Usando variables separadas de Firebase');
    }
    else {
      throw new Error('No se encontraron credenciales de Firebase Admin');
    }

    admin.initializeApp({
      credential,
      storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

    console.log('✅ Firebase Admin inicializado correctamente');
  } catch (error) {
    console.error('❌ Error inicializando Firebase Admin:', error.message);
    // No lanzar error para que la app funcione sin Firebase si es necesario
  }
}

export const adminStorage = admin.apps.length ? admin.storage() : null;
export default admin;