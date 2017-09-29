package com.lesnouveauxpetitsmondes.store.cucumber.stepdefs;

import com.lesnouveauxpetitsmondes.store.repository.UserRepository;
import com.lesnouveauxpetitsmondes.store.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;

public class UserStepDefs {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserMapper userMapper;

}
