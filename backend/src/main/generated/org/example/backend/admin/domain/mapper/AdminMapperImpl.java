package org.example.backend.admin.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.entity.Admin;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-17T20:22:38+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.5 (Azul Systems, Inc.)"
)
@Component
public class AdminMapperImpl implements AdminMapper {

    @Override
    public void updateAdminFromDto(AdminReqDto adminReqDto, Admin admin) {
        if ( adminReqDto == null ) {
            return;
        }

        if ( adminReqDto.getLoginId() != null ) {
            admin.setLoginId( adminReqDto.getLoginId() );
        }
        if ( adminReqDto.getPassword() != null ) {
            admin.setPassword( adminReqDto.getPassword() );
        }
        if ( adminReqDto.getEmail() != null ) {
            admin.setEmail( adminReqDto.getEmail() );
        }
    }

    @Override
    public AdminResDto toAdminDto(Admin admin) {
        if ( admin == null ) {
            return null;
        }

        AdminResDto adminResDto = new AdminResDto();

        adminResDto.setLoginId( admin.getLoginId() );
        adminResDto.setEmail( admin.getEmail() );

        return adminResDto;
    }
}
