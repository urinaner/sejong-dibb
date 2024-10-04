package org.example.backend.admin.domain.mapper;

import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInResDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.global.config.CentralMapperConfig;
import org.mapstruct.Mapper;

@Mapper(config = CentralMapperConfig.class)
public interface SignInMapper {
    AdminResDto toAdminResDto(Admin admin);

    SignInResDto toSingInResDto(TokenDto tokenDto, AdminResDto adminResDto);
}
