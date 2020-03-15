import React from 'react';
import logo from '../../logo.svg';
import './App.css';
import Map from '../../components/map';

function App() {
    return (
        <div className='app-container'>
            <div className='row'>
                <div className='col-md-2'>
                    <div className='card'>
                        <span>Ain Bénian</span>
                        <span>Samedi, 12 mars</span>
                        <span> 9:35 AM</span>
                    </div>

                    <div className='card'>
                        <span>Ain Bénian</span>
                        <span>Samedi, 12 mars</span>
                        <span> 9:35 AM</span>
                    </div>

                    <div className='card'>
                        <div  className='row'>
                            <div className='col-md-6'>
                                weather icon
                            </div>
                            <div className='col-md-6'>
                                20 °C
                            </div>
                        </div>
                        <span>Nuage brisé</span>
                    </div>

                    <div className='card'>
                        <div  className='row'>
                            <div className='col-md-4'>
                                Pression icon
                            </div>
                            <div className='col-md-8'>
                                <span>Pression</span>
                                <span>1019 hpa</span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className='col-md-8'>
                    <div className='top-bar'>
                        <div className='search-container'>
                            <input className='search-input'/>
                        </div>
                    </div>
                    <Map/>
                </div>
                <div className='col-md-2'>
                <div className='card'>
                    <span>Samedi</span>
                    <span>12 mars</span>
                    <div  className='row'>
                        <div className='col-md-6'>
                            weather icon
                        </div>
                        <div className='col-md-6'>
                            20 °C
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
  );
}

export default App;
