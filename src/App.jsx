import Login from "./page/login-page";
import Register from "./page/regisret-page";
import Todu from "./todu-page";
import Error from "./Error-page";
import {Routes,Route,BrowserRouter,HashRouter} from 'react-router-dom'
import { Authprovider } from "./store/authContaxt";
import Admin from "./Admin";
function App() {
  return <>
  
  <HashRouter>
  <Authprovider>
  <Routes>
    <Route path="/" element={<Login/>}/>
    <Route path="/register" element={<Register/>}/>
    <Route path="/tudopage" element={<Todu/>}/>
    <Route path="/admin" element={<Admin/>}/>
    <Route path="*" element={<Error/>}/>
  </Routes>
  </Authprovider>
  </HashRouter>
  </>;
}

export default App;
