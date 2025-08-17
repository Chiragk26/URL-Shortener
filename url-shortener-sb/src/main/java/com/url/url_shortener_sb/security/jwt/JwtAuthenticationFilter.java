package com.url.url_shortener_sb.security.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
//OncePerRequestFilter-> ensures for every request, the class made will execute once
@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Autowired //Autowired annotation is used for dependency injection. We can also do the same by making the field as final and using @AllArgsConstructor over the class but only when there is one constructor.
    private JwtUtils jwtTokenProvider;// objects ke hisab se hi socho!
    @Autowired
    private UserDetailsService userDetailsService;
    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {
        //get JWT from header
        //validate token
        //if valid get user details
            //get username
                // load user(loading username creating userdetails, creating authentication obj and set details with the request)
                // set the auth context
        try {
        String jwt= jwtTokenProvider.getJwtFromHeader(request);

        if(jwt != null && jwtTokenProvider.validateToken(jwt)){
            String username= jwtTokenProvider.getUserNameFromJwtToken(jwt);
            UserDetails userDetails= userDetailsService.loadUserByUsername(username);
            if(userDetails != null){
                UsernamePasswordAuthenticationToken authentication= new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        }

        }catch(Exception e) {
        e.printStackTrace();
        }
    filterChain.doFilter(request,response);
    }
}
