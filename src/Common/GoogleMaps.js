import React, {Component} from 'react';
import ReactDOM from 'react-dom';


import GoogleMapReact from 'google-map-react';



class GoogleMaps extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      center: {lat:40.728199, lng:-73.9894738},
      zoom: 16
    }
  }

  componentDidMount(){
    if(navigator && navigator.geolocation){
      navigator.geolocation.getCurrentPosition((currentPosition) => {
        console.log(currentPosition.coords);
        this.setState({
          center: {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude}
        })
      })
    }
  }

  render() {
    return (
       <GoogleMapReact
        center={this.state.center}
        defaultZoom={this.state.zoom}
      >
      </GoogleMapReact>
    );
  }
}


export default GoogleMaps;