package com.lesnouveauxpetitsmondes.store.config.paypal;

import com.lesnouveauxpetitsmondes.store.config.ApplicationProperties;
import com.paypal.base.rest.APIContext;
import com.paypal.base.rest.PayPalRESTException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Configuration;


@Configuration
public class PaypalConfiguration {

    private final Logger log = LoggerFactory.getLogger(PaypalConfiguration.class);

    private final ApplicationProperties applicationProperties;

    public PaypalConfiguration(ApplicationProperties applicationProperties) {
        this.applicationProperties = applicationProperties;
        log.debug("Configuring PayPal");
    }

    public APIContext getAPIContext() throws PayPalRESTException {

        return new APIContext(applicationProperties.getPaypal().getClientId(),
            applicationProperties.getPaypal().getSecret(), applicationProperties.getPaypal().getEnv());
    }
}
