import React from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
import {
  OrgWrapper,
  OrgContent,
  OrgTitle,
  OrgCard,
  MapContainer,
} from './OrganizationStyle';

// 세종대학교 생명과학대학 좌표
const center = {
  lat: 37.5509,
  lng: 127.0737,
};

const mapContainerStyle = {
  width: '100%',
  height: '100%',
};

// API 키가 없을 경우를 대비한 에러 메시지 컴포넌트
const MapError = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f5f5',
      color: '#666',
    }}
  >
    Google Maps API key is not configured
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
        <OrgTitle>세종대학교 바이오융합공학전공</OrgTitle>

        <OrgCard>
          <dl>
            <dt>위치</dt>
            <dd>
              서울특별시 광진구 능동로 209 (군자동) 생명과학대학 통합사무실
            </dd>

            <dt>TEL</dt>
            <dd>02-3408-3334</dd>

            <dt>E-mail</dt>
            <dd>biodpt@sejong.ac.kr</dd>

            <dt>근무시간</dt>
            <dd>09:00 - 17:30 (점심시간 12:00 - 13:00 / 주말,공휴일 휴무)</dd>
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
