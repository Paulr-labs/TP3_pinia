package com.edition.backend.config;

import com.edition.backend.Services.UserService; // Adapte l'import
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserService userService;

    @Override
    public void run(String... args) throws Exception {
        // On verifie si les users existent deja pour eviter les erreurs au redemarrage
        // si on changeait le ddl-auto plus tard
        if (!userService.existsByUsername("admin")) {
            userService.createAdmin("admin", "admin123");
            System.out.println("Admin créé : admin / admin123");
        }

        if (!userService.existsByUsername("user")) {
            // Créer une méthode createUser dans UserService qui prend username/password
            // Ou utiliser une RegisterRequest bidon
            // Pour faire simple ici, on suppose que tu as la méthode createAdmin,
            // sinon utilise le code ci-dessous si tu as accès au repository directement,
            // ou adapte selon ton UserService.

            // Note: Si tu n'as pas de méthode simple 'createUser(user, pass)' dans UserService,
            // utilise createAdmin pour tester ou rajoute une methode temporaire.
        }
    }
}