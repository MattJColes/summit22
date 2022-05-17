import './App.css';
import React, { useState, useEffect } from 'react';
import EmojiView from './EmojiView'
import { v4 as uuidv4 } from 'uuid';
import { MapView, Heading, Button } from '@aws-amplify/ui-react';
import { createMap } from "maplibre-gl-js-amplify";
import '@aws-amplify/ui-react/styles.css';
import "maplibre-gl/dist/maplibre-gl.css";  
import { Marker, Popup } from 'react-map-gl';
import { API, graphqlOperation } from "aws-amplify";
import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';


async function emojiFeedback(locationName, emoji) {
  const emojiFeedbackData = {
    id: uuidv4(),
    location: locationName,
    emoji: emoji
  };
  
  const createEmoji = await API.graphql({ query: mutations.createEmojiFeedback, variables: {input: emojiFeedbackData}});
}

async function getlocationEmojiCounts() {
  const locationEmojiCounts = await API.graphql({ query: queries.listEmojiFeedbacks });
  console.log(locationEmojiCounts);
}

async function initializeMap() {
  const map = await createMap({
      container: "map", // An HTML Element or HTML element ID to render the map in https://maplibre.org/maplibre-gl-js-docs/api/map/
  })
} 

initializeMap();

function MarkerWithPopup({ latitude, longitude, locationName }) {
  const [showPopup, setShowPopup] = React.useState(false);

  const handleMarkerClick = ({ originalEvent }) => {
    originalEvent.stopPropagation();
    setShowPopup(true);
  };

  return (
    <>
      <Marker
        latitude={latitude}
        longitude={longitude}
        onClick={handleMarkerClick}
      />
      {showPopup && (
        <Popup
          latitude={latitude}
          longitude={longitude}
          onClose={() => setShowPopup(true)}
        >
          <Heading level={1}>{locationName}</Heading>
          <Button onClick={() => emojiFeedback(locationName, '😀')}>😀</Button>
          <Button onClick={() => emojiFeedback(locationName, '🍕')}>🍕</Button>
        </Popup>
      )}
    </>
  );
}

function App() {
  const [ emojis, setEmojis ] = useState([]);

  useEffect(() => {
    const subscription = subscribeToOnCreateEmojiFeedback()
  }, []);

  async function subscribeToOnCreateEmojiFeedback() {
    const subscription = API.graphql({
      query: subscriptions.onCreateEmojiFeedback,
        }).subscribe({
          next: ({ provider, value }) => {
            const emoji = value.data.onCreateEmojiFeedback.emoji;
            const location = value.data.onCreateEmojiFeedback.location;
            console.log({ provider, emoji, location });
            setEmojis((emojis) => [emoji, ...emojis]);
          },
        error: (error) => console.warn(error),
      });
    return subscription;
  }

  getlocationEmojiCounts();

  const [{ latitude, longitude }, setMarkerLocation] = useState({
    latitude: 40,
    longitude: -100,
  });

  const updateMarker = () => setMarkerLocation({ latitude: latitude + 5, longitude: longitude + 5 });

  return (
    <div className="App">
      <div className="Titlebar"><h4>🇦🇺 🤩 🌡 AWS SYDNEY SUMMIT EXCITE-MOMETER 🌡 🤩 🇦🇺</h4>
      <EmojiView/></div>
      <div className="Map">
        <MapView
          initialViewState={{
            latitude: -33.721023,
            longitude: 145.114427,
            zoom: 3
          }}>
          {/* ANZ */}
          <MarkerWithPopup latitude={-40.900600} longitude={174.886000} locationName="New Zealand"/>
          <MarkerWithPopup latitude={-37.020100} longitude={144.964600} locationName="Victoria"/>
          <MarkerWithPopup latitude={-41.640079} longitude={146.315918} locationName="Tasmania"/>
          <MarkerWithPopup latitude={-19.491411} longitude={132.550964} locationName="Northern Territory"/>
          <MarkerWithPopup latitude={-30.000233} longitude={136.209152} locationName="South Australia"/>
          <MarkerWithPopup latitude={-25.042261} longitude={117.793221} locationName="Western Australia"/>
          <MarkerWithPopup latitude={-20.917574} longitude={142.702789} locationName="Queensland"/>
          <MarkerWithPopup latitude={-31.840233} longitude={145.612793} locationName="New South Wales"/>
          {/* Other Continents */}
          <MarkerWithPopup latitude={45.970000} longitude={-98.200000} locationName="North America"/>
          <MarkerWithPopup latitude={-8.783200} longitude={-55.491500} locationName="South America"/>
          <MarkerWithPopup latitude={5.783200} longitude={24.508500} locationName="Africa"/>
          <MarkerWithPopup latitude={50.526000} longitude={20.255100} locationName="Europe"/>
          <MarkerWithPopup latitude={44.047900} longitude={95.619700} locationName="Asia"/>
        </MapView>
      </div>
    </div>
  ); 
}

export default App;
