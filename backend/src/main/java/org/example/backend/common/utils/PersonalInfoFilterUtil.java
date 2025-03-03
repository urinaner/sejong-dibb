package org.example.backend.common.utils;

import static org.example.backend.board.exception.BoardExceptionType.INVALID_CONTENT;

import java.util.regex.Pattern;
import org.example.backend.board.exception.BoardException;

public class PersonalInfoFilterUtil {
    private static final String[] PERSONAL_INFO_PATTERNS = {
            "\\b\\d{6}[-]\\d{7}\\b",  // 주민등록번호 (예: 990101-1234567)
//            "\\b\\d{2,3}[-]\\d{3,4}[-]\\d{4}\\b",  // 전화번호 (예: 010-1234-5678)
            "\\b[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}\\b" // 이메일 주소
    };

    private PersonalInfoFilterUtil() {
    }

    public static void validatePersonalInfo(String content) {
        for (String pattern : PERSONAL_INFO_PATTERNS) {
            if (Pattern.compile(pattern).matcher(content).find()) {
                throw new BoardException(INVALID_CONTENT);
            }
        }
    }
}
