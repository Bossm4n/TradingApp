package com.assadosman.Trading.App.controllers;

import com.assadosman.Trading.App.model.user.User;
import com.assadosman.Trading.App.testDataUtil;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.RequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class UsersControllerIntegrationTest {
    private MockMvc mockMvc;
    private ObjectMapper objectMapper;

    @Autowired
    public UsersControllerIntegrationTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule());
    }

    @Test
    public void createUser() throws Exception {
        User user = testDataUtil.createUserA();
        String userJson = objectMapper.writeValueAsString(user);
        mockMvc.perform(MockMvcRequestBuilders.post("/api/user/signup")
                .contentType(MediaType.APPLICATION_JSON)
                .content(userJson)
        ).andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void getUser() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/user/basil.osman@manchester.com"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }
}
