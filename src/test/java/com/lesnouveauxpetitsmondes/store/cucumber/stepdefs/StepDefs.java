package com.lesnouveauxpetitsmondes.store.cucumber.stepdefs;

import com.lesnouveauxpetitsmondes.store.LesnouveauxpetitsmondesStoreApp;
import com.lesnouveauxpetitsmondes.store.config.WebConfigurer;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.ResultActions;

@WebAppConfiguration
@SpringBootTest(classes = LesnouveauxpetitsmondesStoreApp.class)
@ContextConfiguration(classes = WebConfigurer.class)
public abstract class StepDefs {

    protected ResultActions actions;
}
