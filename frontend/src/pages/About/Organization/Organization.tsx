// Organization.tsx
import React from 'react';
import {
  OrgWrapper,
  OrgContent,
  OrgTitle,
  OrgCard,
  MapContainer,
} from './OrganizationStyle';

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

        {/* Map */}
        <MapContainer>
          <div className="map-placeholder">
            <p>Google Maps will be integrated here</p>
          </div>
        </MapContainer>
      </OrgContent>
    </OrgWrapper>
  );
};

export default Organization;
