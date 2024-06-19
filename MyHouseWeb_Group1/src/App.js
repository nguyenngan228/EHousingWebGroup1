import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Menu from './component/Menu';
import Footer from './component/footer';
import routes from './routes/routes';
import { MyDispatchContext, MyUserContext } from './config/Contexts';
import MyUserReducer from './config/Reducer';
import cookie from 'react-cookies';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
    const [user, dispatch] = useReducer(MyUserReducer, cookie.load("user") || null);

    const showContentMenu = (routes) => {
        if (routes.length > 0) {
            return routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    render={(props) => <route.main {...props} />}
                />
            ));
        }
        return null;
    };

    return (
        <MyUserContext.Provider value={user}>
            <MyDispatchContext.Provider value={dispatch}>
                <Router>
                    <div className="App">
                        <Menu userLogin={user} />
                        <Switch>
                            {showContentMenu(routes)}
                        </Switch>
                        <Footer userLogin={user} />
                    </div>
                </Router>
            </MyDispatchContext.Provider>
        </MyUserContext.Provider>
    );
}

export default App;
