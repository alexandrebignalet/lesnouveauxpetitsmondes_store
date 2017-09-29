package com.lesnouveauxpetitsmondes.store.cucumber.stepdefs;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.lesnouveauxpetitsmondes.store.web.rest.TestUtil;
import com.lesnouveauxpetitsmondes.store.web.rest.vm.LoginVM;
import cucumber.api.java.Before;
import cucumber.api.java.en.And;
import cucumber.api.java.en.Then;
import cucumber.api.java.en.When;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import javax.servlet.Filter;

import static org.hamcrest.Matchers.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class RestApiStepDefs extends StepDefs {

    @Autowired
    private WebApplicationContext context;

    @Autowired
    private Filter springSecurityFilterChain;

    private MockMvc restMockMvc;

    private String token;

    @Before
    public void setup() {
        this.restMockMvc = MockMvcBuilders
            .webAppContextSetup(context)
            .addFilters(springSecurityFilterChain)
            .build();
    }

    @When("^I send a GET request to '([^\"]*)'$")
    public void iSendAGetRequestTo(String uri) throws Throwable {

        actions = restMockMvc.perform(get(uri)
            .header(HttpHeaders.AUTHORIZATION, token)
            .accept(MediaType.APPLICATION_JSON));
    }

    @And("^the response should contain an array of (\\d+) objects")
    public void theResponseShouldContainAnArrayOfUsers(int size) throws Throwable {
        actions
            .andExpect(jsonPath("$", hasSize(size)));
    }

    @Then("^the response code should be (\\d+)$")
    public void theResponseCodeShouldBe(int statusCode) throws Throwable {
        actions
            .andExpect(status().is(statusCode));
    }

    @And("^the response Content-Type should be equal to '([^\"]*)'$")
    public void theResponseContentTypeShouldBeEqualTo(String contentType) throws Throwable {
        actions
            .andExpect(content().contentType(contentType));
    }

    @And("^I am successfully logged in with username: '(.*)', and password: '(.*)'")
    public void i_am_successfully_logged_in_with_username_and_password(String username, String password) throws Exception {
        LoginVM loginVM = new LoginVM();
        loginVM.setUsername(username);
        loginVM.setPassword(password);
        loginVM.setRememberMe(false);

        MvcResult result = restMockMvc.perform(post("/api/authenticate")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(loginVM)))
            .andExpect(status().isOk())
            .andReturn();

        ObjectMapper mapper = new ObjectMapper();
        RestApiStepDefs.Token token = mapper.readValue(result.getResponse().getContentAsString(), RestApiStepDefs.Token.class);
        this.token = "Bearer " + token.getToken();
    }

    @And("^the response should contain json:$")
    public void theResponseShouldContainJson(final String jsonString) throws Throwable {
        actions
            .andExpect(content().json(jsonString));
    }


    public String getToken() {
        return token;
    }

    @When("^I send a DELETE request to '([^\"]*)'$")
    public void iSendADELETERequestToApiUsersSuperAdmin(final String uri) throws Throwable {
        actions = restMockMvc.perform(delete(uri)
            .header(HttpHeaders.AUTHORIZATION, token));
    }

    static class Token {
        @JsonProperty("id_token")
        private String token;

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }
    }
}
