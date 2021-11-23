
import { combineReducers } from 'redux';
import despachosReducer from './despachosReducer';
import alertaReducer from './alertaReducer';




export default combineReducers({
    despachos: despachosReducer,
    alerta: alertaReducer
});