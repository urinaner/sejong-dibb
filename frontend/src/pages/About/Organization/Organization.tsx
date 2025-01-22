import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import {
  OrgWrapper,
  OrgContent,
  OrgCard,
  MapContainer,
} from './OrganizationStyle';
import { Mail, Phone, Clock, MapPin } from 'lucide-react';

const center = {
  lat: 37.5509,
  lng: 127.0737,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

const MapError = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f7fafc',
      color: '#4a5568',
      gap: '12px',
    }}
  >
    <MapPin size={32} />
    <p>지도를 불러올 수 없습니다</p>
  </div>
);

const GoogleMapComponent = () => {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return <MapError />;
  }

  return (
    <LoadScript googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={17}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{ visibility: 'off' }],
            },
          ],
        }}
      >
        <Marker position={center} title="세종대학교 생명과학대학" />
      </GoogleMap>
    </LoadScript>
  );
};

const Organization = () => {
  return (
    <OrgWrapper>
      <OrgContent>
        <OrgCard>
          <dl>
            <dt>
              <MapPin size={18} style={{ marginRight: '8px' }} /> 위치
            </dt>
            <dd>서울특별시 광진구 능동로 209 (군자동) 충무관 103A</dd>

            <dt>
              <Phone size={18} style={{ marginRight: '8px' }} /> TEL
            </dt>
            <dd>02-3408-3334</dd>

            <dt>
              <Mail size={18} style={{ marginRight: '8px' }} /> E-mail
            </dt>
            <dd>biodpt@sejong.ac.kr</dd>

            <dt>
              <Clock size={18} style={{ marginRight: '8px' }} /> 근무시간
            </dt>
            <dd>
              <div className="time-period">
                <div className="period-label">학기 중</div>
                09:00 - 17:30 (점심시간 12:00 - 13:00)
              </div>
              <div className="time-period">
                <div className="period-label">방학 중</div>
                10:00 - 16:30 (점심시간 12:00 - 13:00)
              </div>
              <div
                style={{
                  marginTop: '8px',
                  fontSize: '14px',
                  color: '#666',
                }}
              >
                * 주말 및 공휴일 휴무
              </div>
            </dd>
          </dl>
        </OrgCard>

        <MapContainer>
          <GoogleMapComponent />
        </MapContainer>
      </OrgContent>
    </OrgWrapper>
  );
};

export default Organization;
