package com.lesnouveauxpetitsmondes.store.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.lesnouveauxpetitsmondes.store.security.AuthoritiesConstants;
import com.lesnouveauxpetitsmondes.store.service.UserExtraInfoService;
import com.lesnouveauxpetitsmondes.store.service.dto.UserExtraInfoDTO;
import com.lesnouveauxpetitsmondes.store.web.rest.util.HeaderUtil;
import com.lesnouveauxpetitsmondes.store.web.rest.util.PaginationUtil;
import io.github.jhipster.web.util.ResponseUtil;
import io.swagger.annotations.ApiParam;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing UserExtraInfo.
 */
@RestController
@RequestMapping("/api")
public class UserExtraInfoResource {

    private final Logger log = LoggerFactory.getLogger(UserExtraInfoResource.class);

    private static final String ENTITY_NAME = "userExtraInfo";

    private final UserExtraInfoService userExtraInfoService;

    public UserExtraInfoResource(UserExtraInfoService userExtraInfoService) {
        this.userExtraInfoService = userExtraInfoService;
    }

    /**
     * POST  /user-extra-infos : Create a new userExtraInfo.
     *
     * @param userExtraInfoDTO the userExtraInfoDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new userExtraInfoDTO, or with status 400 (Bad Request) if the userExtraInfo has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/user-extra-infos")
    @Timed
    public ResponseEntity<UserExtraInfoDTO> createUserExtraInfo(@Valid @RequestBody UserExtraInfoDTO userExtraInfoDTO) throws URISyntaxException {
        log.debug("REST request to save UserExtraInfo : {}", userExtraInfoDTO);
        if (userExtraInfoDTO.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new userExtraInfo cannot already have an ID")).body(null);
        }
        UserExtraInfoDTO result = userExtraInfoService.save(userExtraInfoDTO);
        return ResponseEntity.created(new URI("/api/user-extra-infos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /user-extra-infos : Updates an existing userExtraInfo.
     *
     * @param userExtraInfoDTO the userExtraInfoDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated userExtraInfoDTO,
     * or with status 400 (Bad Request) if the userExtraInfoDTO is not valid,
     * or with status 500 (Internal Server Error) if the userExtraInfoDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/user-extra-infos")
    @Timed
    public ResponseEntity<UserExtraInfoDTO> updateUserExtraInfo(@Valid @RequestBody UserExtraInfoDTO userExtraInfoDTO) throws URISyntaxException {
        log.debug("REST request to update UserExtraInfo : {}", userExtraInfoDTO);
        if (userExtraInfoDTO.getId() == null) {
            return createUserExtraInfo(userExtraInfoDTO);
        }
        UserExtraInfoDTO result = userExtraInfoService.save(userExtraInfoDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, userExtraInfoDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /user-extra-infos : get all the userExtraInfos.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of userExtraInfos in body
     */
    @GetMapping("/user-extra-infos")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<UserExtraInfoDTO>> getAllUserExtraInfos(@ApiParam Pageable pageable) {
        log.debug("REST request to get a page of UserExtraInfos");
        Page<UserExtraInfoDTO> page = userExtraInfoService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/user-extra-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /user-extra-infos/:id : get the "id" userExtraInfo.
     *
     * @param id the id of the userExtraInfoDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the userExtraInfoDTO, or with status 404 (Not Found)
     */
    @GetMapping("/user-extra-infos/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<UserExtraInfoDTO> getUserExtraInfo(@PathVariable Long id) {
        log.debug("REST request to get UserExtraInfo : {}", id);
        UserExtraInfoDTO userExtraInfoDTO = userExtraInfoService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(userExtraInfoDTO));
    }

    /**
     * DELETE  /user-extra-infos/:id : delete the "id" userExtraInfo.
     *
     * @param id the id of the userExtraInfoDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/user-extra-infos/{id}")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<Void> deleteUserExtraInfo(@PathVariable Long id) {
        log.debug("REST request to delete UserExtraInfo : {}", id);
        userExtraInfoService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

    /**
     * SEARCH  /_search/user-extra-infos?query=:query : search for the userExtraInfo corresponding
     * to the query.
     *
     * @param query the query of the userExtraInfo search
     * @param pageable the pagination information
     * @return the result of the search
     */
    @GetMapping("/_search/user-extra-infos")
    @Timed
    @Secured(AuthoritiesConstants.ADMIN)
    public ResponseEntity<List<UserExtraInfoDTO>> searchUserExtraInfos(@RequestParam String query, @ApiParam Pageable pageable) {
        log.debug("REST request to search for a page of UserExtraInfos for query {}", query);
        Page<UserExtraInfoDTO> page = userExtraInfoService.search(query, pageable);
        HttpHeaders headers = PaginationUtil.generateSearchPaginationHttpHeaders(query, page, "/api/_search/user-extra-infos");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

}
