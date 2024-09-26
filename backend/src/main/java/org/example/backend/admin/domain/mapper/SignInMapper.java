package org.example.backend.admin.domain.mapper;

import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SingInResDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;

public interface SignInMapper {
    AdminResDto toAdminResDto(Admin admin);

    SingInResDto toSingInResDto(TokenDto tokenDto, AdminResDto adminResDto);
}
