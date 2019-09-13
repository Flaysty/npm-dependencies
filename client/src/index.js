import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import Home from './routes/Home';
import rootReducer from './reducers/rootReducer'

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
    )
)

const App = (
    <Provider store={store}>
        <Home />
    </Provider>
)

ReactDOM.render(
    App,
    document.getElementById('app')
)