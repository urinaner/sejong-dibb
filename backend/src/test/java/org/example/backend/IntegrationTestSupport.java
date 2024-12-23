package org.example.backend;

import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@ActiveProfiles({"test", "aws"})
@SpringBootTest
public abstract class IntegrationTestSupport {


}
