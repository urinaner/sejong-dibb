package org.example.backend;

import org.example.backend.department.domain.mapper.DepartmentMapper;
import org.example.backend.professor.domain.mapper.ProfessorMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles("test")
@SpringBootTest
public abstract class IntegrationTestSupport {

    @Autowired
    protected DepartmentMapper departmentMapper;

    @Autowired
    protected ProfessorMapper professorMapper;

}
