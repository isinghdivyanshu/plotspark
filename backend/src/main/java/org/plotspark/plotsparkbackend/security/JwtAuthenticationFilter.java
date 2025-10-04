package org.plotspark.plotsparkbackend.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

// auth middleware
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    /**
     * <-- FLOW -->
     * Intercept every request except the login and register as specified in SecurityConfig
     * take the token form the request if it has a token otherwise it's an unauthorized request
     * if token is available validate it first to make sure our server generated it, and it's not expired
     * extract the username from the token then create an UsernamePasswordAuthenticationToken Object that includes
     * username, no password (in our case) and roles
     * update context with this object
     * call the next chain
     * */

    private final UserDetailsService userDetailsService;
    private final JwtTokenProvider jwtTokenProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        final String requestURI = request.getRequestURI();
        // don't check the auth routes even if token is found
        if(requestURI.startsWith("/api/auth")) {
            filterChain.doFilter(request, response);
            return;
        }

        String accessToken = getTokenFromRequest(request);

        if(StringUtils.hasText(accessToken) && jwtTokenProvider.validateToken(accessToken)) {
            String username = jwtTokenProvider.getUsernameFromToken(accessToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(
                    userDetails,
                    null,
                    userDetails.getAuthorities()
            );

            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(authenticationToken);
        }

        filterChain.doFilter(request, response);
    }

    private String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if(StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }
}
