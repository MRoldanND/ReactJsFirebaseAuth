<h1>Crear usuarios y validarlos React Js con Firebase</h1>

------------------------------------------------------------------------------------------------------------------------------------



<h2>Prueba local</h2>

```
git clone https://github.com/MRoldanND/ReactJsFirebaseAuth.git
cd REactJsFirebaseAuth
npm install
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

* ```react
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
  
  * ```react
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

  ```react
  import app from 'firebase/app';
  
  const config = {
    apiKey: "    ",
    authDomain: "   ",
    databaseURL: "  ",
    projectId: "   ",
    storageBucket: "   ",
    messagingSenderId: "       ",
    appId: "  ",
    measurementId: "  "
  };
  class Firebase {
    constructor() {
      app.initializeApp(config);
    }
  }
   
  export default Firebase;
  ```

*  *src/components/Firebase/context.js* se crea context.js con:

* ```react
  import React from 'react';
   
  const FirebaseContext = React.createContext(null);
   
  export default FirebaseContext;
  ```

* Se pasa el index a firebase.js y en index.js se deja con:

* ```react
  import FirebaseContext from './context';
  import Firebase from './firebase';
   
  export default Firebase;
   
  export { FirebaseContext };
  ```

* Dentro de src/index.js y quedara así

* ```react
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

* ```react
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

* dentro de src/components/SignUp/index.js

* ```react
  import React, { Component } from 'react';
  import { Link, withRouter } from 'react-router-dom';
  import { FirebaseContext } from '../Firebase';
  import { withFirebase } from '../Firebase';
  
  import * as ROUTES from '../../constants/routes';
   
  const SignUpPage = () => (
    <div>
      <h1>SignUp</h1>
      <SignUpForm />
    </div>
  );
  
  const INITIAL_STATE = {
    username: '',
    email: '',
    passwordOne: '',
    passwordTwo: '',
    error: null,
  };
  
  class SignUpFormBase extends Component  {
    constructor(props) {
      super(props);
      this.state = { ...INITIAL_STATE };
  
      
    }
   
    onSubmit = event => {
      const { username, email, passwordOne } = this.state;
   
      this.props.firebase
        .doCreateUserWithEmailAndPassword(email, passwordOne)
        .then(authUser => {
          this.setState({ ...INITIAL_STATE });
          this.props.history.push(ROUTES.HOME);
        })
        .catch(error => {
          this.setState({ error });
        });
   
      event.preventDefault();
    }
   
    onChange = event => {
   
    };
   
    render() {
      const {
        username,
        email,
        passwordOne,
        passwordTwo,
        error,
      } = this.state;
  
  
  
      const isInvalid =
        passwordOne !== passwordTwo ||
        passwordOne === '' ||
        email === '' ||
        username === '';
  
  
      return (
        <form onSubmit={this.onSubmit}>
          <input
            name="username"
            value={username}
            onChange={this.onChange}
            type="text"
            placeholder="Full Name"
          />
          <input
            name="email"
            value={email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <input
            name="passwordOne"
            value={passwordOne}
            onChange={this.onChange}
            type="password"
            placeholder="Password"
          />
          <input
            name="passwordTwo"
            value={passwordTwo}
            onChange={this.onChange}
            type="password"
            placeholder="Confirm Password"
          />
          <button disabled={isInvalid} type="submit">Sign Up</button>
   
          {error && <p>{error.message}</p>}
        </form>
      );
    }
  }
   
  const SignUpLink = () => (
    <p>
      Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </p>
  );
   
  const SignUpForm = withRouter(withFirebase(SignUpFormBase));
  export default SignUpPage;
   
  export { SignUpForm, SignUpLink };
  ```

* Dentro de src/components/Firebase/context.js

* ```react
  import React from 'react';
   
  const FirebaseContext = React.createContext(null);
  export const withFirebase = Component => props => (
      <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
      </FirebaseContext.Consumer>
    );
  export default FirebaseContext;
  ```

* dentro de isrc/components/Firebase/index.js

* ```react
  import FirebaseContext, { withFirebase } from './context';
  import Firebase from './firebase';
  
  export default Firebase;
  export { FirebaseContext, withFirebase };
  ```

* en la linea de comandos

  * ```
    npm install recompose
    ```

* 

<h2>Sign In o Ingresar</h2>

src/componets/SignIn/index.js

```react
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
 
import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
 
const SignInPage = () => (
  <div>
    <h1>SignIn</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);
 
const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};
 
class SignInFormBase extends Component {
  constructor(props) {
    super(props);
 
    this.state = { ...INITIAL_STATE };
  }
 
  onSubmit = event => {
    const { email, password } = this.state;
 
    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        this.setState({ error });
      });
 
    event.preventDefault();
  };
 
  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
  render() {
    const { email, password, error } = this.state;
 
    const isInvalid = password === '' || email === '';
 
    return (
      <form onSubmit={this.onSubmit}>
        <input
          name="email"
          value={email}
          onChange={this.onChange}
          type="text"
          placeholder="Email Address"
        />
        <input
          name="password"
          value={password}
          onChange={this.onChange}
          type="password"
          placeholder="Password"
        />
        <button disabled={isInvalid} type="submit">
          Sign In
        </button>
 
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}
 
const SignInForm = compose(
  withRouter,
  withFirebase,
)(SignInFormBase);
 
export default SignInPage;
 
export { SignInForm };
```

<h2>Sign Out o Salir</h2>

src/components/SignOut/index.js

```react
import React from 'react';
import { Link } from 'react-router-dom';
 
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
 
const Navigation = () => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.SIGN_IN}>Sign In</Link>
      </li>
      <li>
        <Link to={ROUTES.LANDING}>Landing</Link>
      </li>
      <li>
        <Link to={ROUTES.HOME}>Home</Link>
      </li>
      <li>
        <Link to={ROUTES.ACCOUNT}>Account</Link>
      </li>
      <li>
        <Link to={ROUTES.ADMIN}>Admin</Link>
      </li>
      <li>
        <SignOutButton />
      </li>
    </ul>
  </div>
);
 
export default Navigation;
```



<h3>Basado en tutorial de ROBIN WIERUCH, 2018 - <a href="https://www.robinwieruch.de/complete-firebase-authentication-react-tutorial">Ir a Web</a>
