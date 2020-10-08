<h1>Crear usuarios y validarlos React Js con Firebase</h1>

------------------------------------------------------------------------------------------------------------------------------------



<h2>Prueba local</h2>

```
npm run build
npm start
```




<h2>Proceso de Creación</h2>

**Se crea un proyecto en react js**

```
npx create-react-app nombre-app
cd nombre-app
npm start
```

**Se inicia la configuración**

* se elimina, lo que no se usa

* ```
  cd src
  rm App.js App.test.js App.css logo.svg
  ```

* Se crea componente dentro de src

* ```
  mkdir components
  ```

* En la carpeta que se creara seran puestos los componentes. ademas de restaurar el proyecto

* ```
  cd components
  mkdir Account Admin App Home Landing SignIn SignOut SignUp
  mkdir Navigation PasswordChange PasswordForget
  mkdir Session Firebase
  ```

* Se creara un index.js en cada carpeta

* ```
  import React from 'react';
   
  const App = () => (
    <div>
      <h1>App</h1>
    </div>
  );
   
  export default App;
  ```

  * Se redireeciona inte/dos/src/index.js

  * ```
    import App from './components/App'
    ```

* Se crea otro folder en src

* ```
  mkdir constants
  cd constants
  touch routes.js roles.js
  cd ..
  ```

  * /Users/mario/Documents/landing/inte/dos/src/constants/routes.js es preferible que dejen rutas contanstens
  
  * ```
    export const LANDING = '/';
    export const SIGN_UP = '/signup';
    export const SIGN_IN = '/signin';
    export const HOME = '/home';
    export const ACCOUNT = '/account';
    export const ADMIN = '/admin';
    export const PASSWORD_FORGET = '/pw-forget';
    ```
  
* ```
  npm install react - enrutador - dom
  ```

  **Se crea firebase en el proyecto**

  ```
  npm install firebase
  ```

  *src/components/Firebase/firebase.js* se usa para configurar las llaves de firebase (En la configuracion del proyecto, en configuracion)

  ```
  import app from 'firebase/app';
  
  const config = {
    apiKey: "AIzaSyAY9rDF5fb1ZGL7t4cBgzRFZOuz3UZXx7Y",
    authDomain: "login-agencia.firebaseapp.com",
    databaseURL: "https://login-agencia.firebaseio.com",
    projectId: "login-agencia",
    storageBucket: "login-agencia.appspot.com",
    messagingSenderId: "474994441231",
    appId: "1:474994441231:web:9503a587ca3494f294b77a",
    measurementId: "G-JDQPLEHZLJ"
  };
  class Firebase {
    constructor() {
      app.initializeApp(config);
    }
  }
   
  export default Firebase;
  ```

*  *src/components/Firebase/context.js* se crea context.js con:

* ```
  import React from 'react';
   
  const FirebaseContext = React.createContext(null);
   
  export default FirebaseContext;
  ```

* Se pasa el index a firebase.js y en index.js se deja con:

* ```
  import FirebaseContext from './context';
  import Firebase from './firebase';
   
  export default Firebase;
   
  export { FirebaseContext };
  ```

* Dentro de src/index.js y quedara así

* ```
  import React from 'react';
  import ReactDOM from 'react-dom';
   
  import './index.css';
  import * as serviceWorker from './serviceWorker';
   
  import App from './components/App';
  import Firebase, { FirebaseContext } from './components/Firebase';
   
  ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
      <App />
    </FirebaseContext.Provider>,
    document.getElementById('root'),
  );
  // If you want your app to work offline and load faster, you can change
  // unregister() to register() below. Note this comes with some pitfalls.
  // Learn more about service workers: https://bit.ly/CRA-PWA
  serviceWorker.unregister();
  
  ```

  

<h2>API de Autenticacion</h2>

**Correo**

* Se habilita dentro de firebase esta opcion

* *src/components/Firebase/firebase.js* se agrega

* ```
  import app from 'firebase/app';
  import 'firebase/auth';
  
  const config = {...};
  
  class Firebase {
    constructor() {
      app.initializeApp(config);
   
      this.auth = app.auth();
    }
   
    //API de Atenticacion 
  
   
    doCreateUserWithEmailAndPassword = (email, password) =>
      this.auth.createUserWithEmailAndPassword(email, password);
   
    doSignInWithEmailAndPassword = (email, password) =>
      this.auth.signInWithEmailAndPassword(email, password);
   
    doSignOut = () => this.auth.signOut();
   
    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);
   
    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
      
  }
  
  
  export default Firebase;
  ```

  





<h2>SignUp</h2>





<h2>Sign In o Ingresar</h2>





<h3>Basado en tutorial de ROBIN WIERUCH, 2018 - <a href="https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial">Ir a Web</a>