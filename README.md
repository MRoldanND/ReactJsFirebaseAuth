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

  

<h2>SignUp o Crear Usuario</h2>



<h2>Singn o Ingresar</h2>





<h3>Basado en tutorial de ROBIN WIERUCH, 2018 - <a href="https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial">Ir a Web</a>