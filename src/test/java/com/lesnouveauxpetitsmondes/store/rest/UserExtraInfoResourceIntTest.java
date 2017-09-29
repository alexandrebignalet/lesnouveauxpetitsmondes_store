package com.lesnouveauxpetitsmondes.store.web.rest;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;

import com.lesnouveauxpetitsmondes.store.domain.UserExtraInfo;
import com.lesnouveauxpetitsmondes.store.domain.Address;
import com.lesnouveauxpetitsmondes.store.domain.User;
import com.lesnouveauxpetitsmondes.store.repository.UserExtraInfoRepository;
import com.lesnouveauxpetitsmondes.store.service.UserExtraInfoService;
import com.lesnouveauxpetitsmondes.store.repository.search.UserExtraInfoSearchRepository;
import com.lesnouveauxpetitsmondes.store.service.dto.UserExtraInfoDTO;
import com.lesnouveauxpetitsmondes.store.service.mapper.UserExtraInfoMapper;
import com.lesnouveauxpetitsmondes.store.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the UserExtraInfoResource REST controller.
 *
 * @see UserExtraInfoResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
public class UserExtraInfoResourceIntTest {

    @Autowired
    private UserExtraInfoRepository userExtraInfoRepository;

    @Autowired
    private UserExtraInfoMapper userExtraInfoMapper;

    @Autowired
    private UserExtraInfoService userExtraInfoService;

    @Autowired
    private UserExtraInfoSearchRepository userExtraInfoSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restUserExtraInfoMockMvc;

    private UserExtraInfo userExtraInfo;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        UserExtraInfoResource userExtraInfoResource = new UserExtraInfoResource(userExtraInfoService);
        this.restUserExtraInfoMockMvc = MockMvcBuilders.standaloneSetup(userExtraInfoResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UserExtraInfo createEntity(EntityManager em) {
        UserExtraInfo userExtraInfo = new UserExtraInfo();
        // Add required entity
        Address billingAddress = AddressResourceIntTest.createEntity(em);
        em.persist(billingAddress);
        em.flush();
        userExtraInfo.setBillingAddress(billingAddress);
        // Add required entity
        User user = UserResourceIntTest.createEntity(em);
        em.persist(user);
        em.flush();
        userExtraInfo.setUser(user);
        return userExtraInfo;
    }

    @Before
    public void initTest() {
        userExtraInfoSearchRepository.deleteAll();
        userExtraInfo = createEntity(em);
    }

    @Test
    @Transactional
    public void createUserExtraInfo() throws Exception {
        int databaseSizeBeforeCreate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);
        restUserExtraInfoMockMvc.perform(post("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeCreate + 1);
        UserExtraInfo testUserExtraInfo = userExtraInfoList.get(userExtraInfoList.size() - 1);

        // Validate the UserExtraInfo in Elasticsearch
        UserExtraInfo userExtraInfoEs = userExtraInfoSearchRepository.findOne(testUserExtraInfo.getId());
        assertThat(userExtraInfoEs).isEqualToComparingFieldByField(testUserExtraInfo);
    }

    @Test
    @Transactional
    public void createUserExtraInfoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo with an existing ID
        userExtraInfo.setId(1L);
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUserExtraInfoMockMvc.perform(post("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllUserExtraInfos() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        // Get all the userExtraInfoList
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtraInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void getUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);

        // Get the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos/{id}", userExtraInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(userExtraInfo.getId().intValue()));
    }

    @Test
    @Transactional
    public void getNonExistingUserExtraInfo() throws Exception {
        // Get the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/user-extra-infos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);
        userExtraInfoSearchRepository.save(userExtraInfo);
        int databaseSizeBeforeUpdate = userExtraInfoRepository.findAll().size();

        // Update the userExtraInfo
        UserExtraInfo updatedUserExtraInfo = userExtraInfoRepository.findOne(userExtraInfo.getId());
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(updatedUserExtraInfo);

        restUserExtraInfoMockMvc.perform(put("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isOk());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeUpdate);
        UserExtraInfo testUserExtraInfo = userExtraInfoList.get(userExtraInfoList.size() - 1);

        // Validate the UserExtraInfo in Elasticsearch
        UserExtraInfo userExtraInfoEs = userExtraInfoSearchRepository.findOne(testUserExtraInfo.getId());
        assertThat(userExtraInfoEs).isEqualToComparingFieldByField(testUserExtraInfo);
    }

    @Test
    @Transactional
    public void updateNonExistingUserExtraInfo() throws Exception {
        int databaseSizeBeforeUpdate = userExtraInfoRepository.findAll().size();

        // Create the UserExtraInfo
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoMapper.toDto(userExtraInfo);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restUserExtraInfoMockMvc.perform(put("/api/user-extra-infos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(userExtraInfoDTO)))
            .andExpect(status().isCreated());

        // Validate the UserExtraInfo in the database
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);
        userExtraInfoSearchRepository.save(userExtraInfo);
        int databaseSizeBeforeDelete = userExtraInfoRepository.findAll().size();

        // Get the userExtraInfo
        restUserExtraInfoMockMvc.perform(delete("/api/user-extra-infos/{id}", userExtraInfo.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean userExtraInfoExistsInEs = userExtraInfoSearchRepository.exists(userExtraInfo.getId());
        assertThat(userExtraInfoExistsInEs).isFalse();

        // Validate the database is empty
        List<UserExtraInfo> userExtraInfoList = userExtraInfoRepository.findAll();
        assertThat(userExtraInfoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchUserExtraInfo() throws Exception {
        // Initialize the database
        userExtraInfoRepository.saveAndFlush(userExtraInfo);
        userExtraInfoSearchRepository.save(userExtraInfo);

        // Search the userExtraInfo
        restUserExtraInfoMockMvc.perform(get("/api/_search/user-extra-infos?query=id:" + userExtraInfo.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(userExtraInfo.getId().intValue())));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtraInfo.class);
        UserExtraInfo userExtraInfo1 = new UserExtraInfo();
        userExtraInfo1.setId(1L);
        UserExtraInfo userExtraInfo2 = new UserExtraInfo();
        userExtraInfo2.setId(userExtraInfo1.getId());
        assertThat(userExtraInfo1).isEqualTo(userExtraInfo2);
        userExtraInfo2.setId(2L);
        assertThat(userExtraInfo1).isNotEqualTo(userExtraInfo2);
        userExtraInfo1.setId(null);
        assertThat(userExtraInfo1).isNotEqualTo(userExtraInfo2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(UserExtraInfoDTO.class);
        UserExtraInfoDTO userExtraInfoDTO1 = new UserExtraInfoDTO();
        userExtraInfoDTO1.setId(1L);
        UserExtraInfoDTO userExtraInfoDTO2 = new UserExtraInfoDTO();
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO2.setId(userExtraInfoDTO1.getId());
        assertThat(userExtraInfoDTO1).isEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO2.setId(2L);
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
        userExtraInfoDTO1.setId(null);
        assertThat(userExtraInfoDTO1).isNotEqualTo(userExtraInfoDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(userExtraInfoMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(userExtraInfoMapper.fromId(null)).isNull();
    }
}
