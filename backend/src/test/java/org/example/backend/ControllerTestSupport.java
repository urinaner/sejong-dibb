package org.example.backend;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.example.backend.admin.service.AdminService;
import org.example.backend.department.controller.DepartmentController;
import org.example.backend.department.service.DepartmentService;
import org.example.backend.jwt.JWTUtil;
import org.example.backend.professor.controller.ProfessorController;
import org.example.backend.professor.service.ProfessorService;
import org.example.backend.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(controllers = {
        DepartmentController.class,
        ProfessorController.class
})
@AutoConfigureMockMvc(addFilters = false)
@WithMockUser(roles = "ADMIN")
public abstract class ControllerTestSupport {

    @Autowired
    protected MockMvc mockMvc;

    @Autowired
    protected ObjectMapper objectMapper;

    @MockBean
    protected DepartmentService departmentService;

    @MockBean
    protected ProfessorService professorService;
    @MockBean
    protected AdminService adminService;

    @MockBean
    protected UserService userService;

    @MockBean
    protected JWTUtil jwtUtil;
}
