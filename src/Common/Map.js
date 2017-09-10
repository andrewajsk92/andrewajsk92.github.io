import React, {Component} from 'react';
import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Map extends Component{

  constructor(props){
    super(props);
    this.state = {
      map: null,
      currentPosition: '',
      center: {lat:40.728199, lng:-73.9894738}
    }

  }

  mapMoved(){
    console.log("mapMoved: " + JSON.stringify(this.state.map.getCenter()));
  }

  mapLoaded(map){
    if(this.state.map != null)
      return
    this.setState({
      map: map
    })
    navigator.geolocation.getCurrentPosition((currentPosition) => {
      console.log(currentPosition.coords);
      this.setState({
        center: {lat: currentPosition.coords.latitude, lng: currentPosition.coords.longitude}
      })
    })
  }

  zoomChanged(){
    console.log("zoomChanged: " + this.state.map.getZoom());

  }

  render(){
    console.log(this.state.center);
    console.log(this.props.center);
    const markers = this.props.markers || []
    
    return(
      <div>
        <GoogleMap
          ref={this.mapLoaded.bind(this)}
          onZoomChanged={this.zoomChanged.bind(this)}
          onDragEnd={this.mapMoved.bind(this)}
          defaultZoom={this.props.zoom}
          defaultCenter={this.state.center}>
          {markers.map((marker, index) => (
            <Marker {...marker} />
            )
          )}
        </GoogleMap>
      </div>
    )
  }
}

export default withGoogleMap(Map);