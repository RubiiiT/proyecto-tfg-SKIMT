package com.skimt.backend.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth

                        .requestMatchers("/juegos",
                                "/usuarios/inicioSesion",
                                "/usuarios",
                                "/usuarios/paraChat",
                                "/juegos/aleatorios",
                                "usuarios/{id}/juegos",
                                "/pedidos",
                                "/juegos/{id}",
                                "/juegos/{juegoId}/usuarios",
                                "/juegos/por-nombre-y-usuario",
                                "/resenas",
                                "/{id}/dinero",
                                "/usuarios/*/dinero",  
                                "/usuarios/**",
                                "/resenas/juego/{id}").permitAll()

                        .anyRequest().authenticated()
                );

        return http.build();
    }
}
