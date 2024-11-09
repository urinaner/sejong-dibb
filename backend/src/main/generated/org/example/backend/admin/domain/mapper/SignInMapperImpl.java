package org.example.backend.admin.domain.mapper;

import javax.annotation.processing.Generated;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInResDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2024-11-09T17:45:34+0900",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 21.0.4 (Eclipse Adoptium)"
)
@Component
public class SignInMapperImpl implements SignInMapper {

    @Override
    public AdminResDto toAdminResDto(Admin admin) {
        if ( admin == null ) {
            return null;
        }

        AdminResDto adminResDto = new AdminResDto();

        adminResDto.setPassword( admin.getPassword() );
        adminResDto.setEmail( admin.getEmail() );

        return adminResDto;
    }

    @Override
    public SignInResDto toSingInResDto(TokenDto tokenDto, AdminResDto adminResDto) {
        if ( tokenDto == null && adminResDto == null ) {
            return null;
        }

        SignInResDto signInResDto = new SignInResDto();

        return signInResDto;
    }
}
