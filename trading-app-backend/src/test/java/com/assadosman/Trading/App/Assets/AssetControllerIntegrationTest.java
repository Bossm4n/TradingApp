package com.assadosman.Trading.App.Assets;

import com.assadosman.Trading.App.model.Assets.AssetRepo;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@ExtendWith(SpringExtension.class)
@AutoConfigureMockMvc
@DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD)
public class AssetControllerIntegrationTest {
    private MockMvc mockMvc;
    private AssetRepo assetRepo;

    @Autowired
    public AssetControllerIntegrationTest(MockMvc mockMvc, AssetRepo assetRepo) {
        this.mockMvc = mockMvc;
        this.assetRepo = assetRepo;
    }

    @Test
    public void testThatCreateBook() throws Exception {
        mockMvc.perform(MockMvcRequestBuilders.get("/api/assets/Apple"))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value("Apple")
        );
    }
}
