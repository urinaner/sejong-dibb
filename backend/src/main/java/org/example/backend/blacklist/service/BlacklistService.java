package org.example.backend.blacklist.service;

import org.example.backend.blacklist.dto.BlackListTokenDto;

public interface BlacklistService {

    // 블랙리스트에 토큰 등록
    void addToBlacklist(BlackListTokenDto blackListTokenDto);

    // 블랙리스트 여부 확인
    boolean isBlacklisted(String token);
}