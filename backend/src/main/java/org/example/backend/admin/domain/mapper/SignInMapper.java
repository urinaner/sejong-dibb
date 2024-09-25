package org.example.backend.admin.domain.mapper;

import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.dto.SignInReqDto;
import org.example.backend.admin.domain.dto.SingInResDto;
import org.example.backend.admin.domain.dto.TokenDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.professor.domain.dto.professor.ProfessorReqDto;
import org.example.backend.professor.domain.entity.Professor;

public interface SignInMapper {
    Admin toEntity(SignInReqDto signInReqDto);

    AdminResDto toAdminResDto(Admin admin);

    SingInResDto toSingInResDto(TokenDto tokenDto, AdminResDto adminResDto);
}
