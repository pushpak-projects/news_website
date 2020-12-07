import React from 'react';
import './App.css';
import HeaderTest from './components/HeaderTest';
import 'bootstrap/dist/css/bootstrap.css';
class App extends React.Component {
    render() {
        return (
            <div className="appcontainer">
                <HeaderTest></HeaderTest>               
                
            </div>
        )
    }
}
                
export default App;
