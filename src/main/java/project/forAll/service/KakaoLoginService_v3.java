/*
package project.forAll.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import project.forAll.domain.member.KakaoMember;
import project.forAll.repository.KakaoMemberRepository;
import project.forAll.repository.MemberRepository;
import project.forAll.util.dto.KakaoMemberDto;
import project.forAll.util.dto.KakaoTokenDto;
import project.forAll.util.dto.LoginResponseDto;

import java.io.*;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.HashMap;

@Component
@Transactional(readOnly = true)
public class KakaoLoginService extends Service {

    @Autowired
    private KakaoMemberRepository kakaoMemberRepository;

    @Override
    protected JpaRepository getRepository() {
        return kakaoMemberRepository;
    }

    public KakaoTokenDto getAccessToken(String code) {
        // Http Response Header 객체 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        // Http Response Body 객체 생성
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code"); //카카오 공식문서 기준 authorization_code 로 고정
        params.add("client_id", "ef3dbe29e95781d561acb3dfbcab36b1"); // 카카오 Dev 앱 REST API 키
        params.add("redirect_uri", "http://localhost:3000/login/oauth2/callback/kakao"); // 카카오 Dev redirect uri
        params.add("code", code); // 프론트에서 인가 코드 요청시 받은 인가 코드값

        // 헤더와 바디 합치기 위해 Http Entity 객체 생성
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // 카카오로부터 Access token 받아오기
        RestTemplate rt = new RestTemplate();
        ResponseEntity<String> accessTokenResponse = rt.exchange(
                "https://kauth.kakao.com/oauth/token",
                HttpMethod.POST,
                kakaoTokenRequest,
                String.class
        );

        // JSON Parsing (-> KakaoTokenDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoTokenDto kakaoTokenDto = null;
        try {
            kakaoTokenDto = objectMapper.readValue(accessTokenResponse.getBody(), KakaoTokenDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        return kakaoTokenDto;
    }

    public ResponseEntity<LoginResponseDto> kakaoLogin(String kakaoAccessToken) {
        // 아래 return에서 headers 변수가 없다고 해서 추가
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        KakaoMember kakaoMember = getKakaoInfo(kakaoAccessToken);

        LoginResponseDto loginResponseDto = new LoginResponseDto();
        loginResponseDto.setLoginSuccess(true);
        loginResponseDto.setKakaoMember(kakaoMember);

        KakaoMember existOwner = kakaoMemberRepository.findById(kakaoMember.getId()).orElse(null);
        try {
            if (existOwner == null) {
                System.out.println("처음 로그인 하는 회원입니다.");
                kakaoMemberRepository.save(kakaoMember);
            }
            loginResponseDto.setLoginSuccess(true);

            return ResponseEntity.ok().headers(headers).body(loginResponseDto);

        } catch (Exception e) {
            loginResponseDto.setLoginSuccess(false);
            return ResponseEntity.badRequest().body(loginResponseDto);
        }
    }

    public KakaoMember getKakaoInfo(String kakaoAccessToken) {
        RestTemplate rt = new RestTemplate();

        // 필수 헤더 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + kakaoAccessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> accountInfoRequest = new HttpEntity<>(headers);

        // POST 방식으로 API 서버에 요청 후 response 받아옴
        ResponseEntity<String> accountInfoResponse = rt.exchange(
                "https://kapi.kakao.com/v2/user/me",
                HttpMethod.POST,
                accountInfoRequest,
                String.class
        );

        // JSON Parsing (-> kakaoAccountDto)
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.registerModule(new JavaTimeModule());
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        KakaoMemberDto kakaoMemberDto = null;
        try {
            kakaoMemberDto = objectMapper.readValue(accountInfoResponse.getBody(), KakaoMemberDto.class);
        } catch (JsonProcessingException e) {
            e.printStackTrace();
        }

        // 회원가입 처리하기
        Long kakaoId = kakaoMemberDto.getId();
        KakaoMember existOwner = kakaoMemberRepository.findById(kakaoId).orElse(null);
        // 처음 로그인이 아닌 경우
        if (existOwner != null) {
            return KakaoMember.builder()
                    .id(kakaoMemberDto.getId())
                    .build();
        }
        // 처음 로그인 하는 경우
        else {
            return KakaoMember.builder()
                    .build();
        }
    }
}
*/