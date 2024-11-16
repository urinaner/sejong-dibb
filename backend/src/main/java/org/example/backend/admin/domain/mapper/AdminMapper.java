package org.example.backend.admin.domain.mapper;

import org.example.backend.admin.domain.dto.AdminReqDto;
import org.example.backend.admin.domain.dto.AdminResDto;
import org.example.backend.admin.domain.entity.Admin;
import org.example.backend.global.config.CentralMapperConfig;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper(config = CentralMapperConfig.class, componentModel = "spring")
public interface AdminMapper {

    AdminMapper INSTANCE = Mappers.getMapper(AdminMapper.class);

    @Mapping(target = "id", ignore = true)
    void updateAdminFromDto(AdminReqDto adminReqDto, @MappingTarget Admin admin);

    AdminResDto toAdminDto(Admin admin);
}
