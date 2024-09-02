package com.assadosman.Trading.App.controllers;

import com.assadosman.Trading.App.testDataUtil;
import com.assadosman.Trading.App.model.Transactions.Transaction;
import com.assadosman.Trading.App.model.user.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class TransactionControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    private ObjectMapper objectMapper;

    @Autowired
    public TransactionControllerIntegrationTest(MockMvc mockMvc) {
        this.mockMvc = mockMvc;
        this.objectMapper = new ObjectMapper();
        this.objectMapper.registerModule(new JavaTimeModule()); // Register the module here
    }

    @Test
    public void testBuying() throws Exception {
        Transaction transaction = testDataUtil.createPurchaseA();
        String transactionJson = objectMapper.writeValueAsString(transaction);
        mockMvc.perform(
                        MockMvcRequestBuilders.post("/api/transaction/buy")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(transactionJson)
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    public void getUsersTransactions() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/transaction/1"))
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

}

