package com.url.url_shortener_sb.security.jwt;

import com.url.url_shortener_sb.service.UserDetailsImpl;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.hibernate.annotations.Comment;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.security.Key;
import java.util.Date;
import java.util.stream.Collectors;

@Component
public class JwtUtils {
    // jwt utils acts as a tool that does all work related to tokens-> generating, extracting, reading and validating
    // url is what you see--> converted into http request(raw) by browser that contains metadeta like headers--> converted to http servlet request(organized java object) by tomact server.
    //Authorization Header (out of many headers)->Authorization: Bearer <Token> (key[header name]:value[bearerToken-> string])
    @Value("${jwt.secret}")
    private String jwtSecret;
    @Value("${jwt.expiration}")
    private int jwtExpirationMs;
    //method to extract token
    public String getJwtFromHeader(HttpServletRequest request){
        String bearerToken= request.getHeader("Authorization");
        if(bearerToken != null && bearerToken.startsWith("Bearer ")){
            return bearerToken.substring(7);
        }
      return null;
    }

    //method to generate token
public String generateToken(UserDetailsImpl userDetails){
        String username= userDetails.getUsername();
        String roles=userDetails.getAuthorities().stream()
                .map(authority->authority.getAuthority())
                .collect(Collectors.joining(","));
        return Jwts.builder()
                .subject(username)
                .claim("roles",roles)
                .issuedAt(new Date())
                .expiration(new Date(new Date().getTime()+jwtExpirationMs))  //2 days = 172800000 ms
                .signWith(key())
                .compact();
}

// get username from token
public String getUserNameFromJwtToken(String token){
        return Jwts.parser()
                .verifyWith((SecretKey) key())
                .build().parseSignedClaims(token)
                .getPayload().getSubject();
}

// validate token
    public boolean validateToken(String authToken){
        try {
            Jwts.parser().verifyWith((SecretKey) key())
                    .build().parseSignedClaims(authToken);
            return true;
        } catch (JwtException e) {
            throw new RuntimeException(e);
        } catch (IllegalArgumentException e) {
            throw new RuntimeException(e);
        } catch(Exception e){
        throw new RuntimeException(e);
        }
    }

private Key key(){
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
}
}
