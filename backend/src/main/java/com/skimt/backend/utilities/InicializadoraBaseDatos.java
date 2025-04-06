package com.skimt.backend.utilities;

import java.sql.*;

public class InicializadoraBaseDatos {

    public static void crearBaseDatos (String nombreBD) {
        String url = "jdbc:mysql://localhost:3306/";
        String usuario = "admin";
        String contrasena = "admin1234";


        try (Connection con = DriverManager.getConnection(url, usuario, contrasena))
             {
                 String stringCrearBD = "CREATE DATABASE IF NOT EXISTS "+nombreBD+";";
                 PreparedStatement pt = con.prepareStatement(stringCrearBD);


                 //Ejecutamos la consulta como "executeUpdate" ya que esto no es una consulta, sino una creacion de bbdd
                 int rs = pt.executeUpdate();

                 //si hay un warning , significa que la base de datos ya estaba creada ya que al ejecutar la sentencia de creacion, da un warning si ya esta creada
                 SQLWarning warning = pt.getWarnings();
                 if (warning != null) {

                     System.out.println("La base de datos '" + nombreBD + "' ya existe.");
                 } else {

                     System.out.println("Base de datos '" + nombreBD + "' creada exitosamente.");
                 }
                 System.out.println(rs);
                 
                 
                 
                 
        } catch (Exception e) {
            System.err.println("Algo ha salido mal en la creacion de la base de datos: "+e.getMessage());
        }
    }
    
    public static void insertarDatosPrueba (String nombreBD) {
        String url = "jdbc:mysql://localhost:3306/" + nombreBD ;
        String usuario = "admin";
        String contrasena = "admin1234";
        
        String sql = "INSERT INTO juego (descripcion, foto_larga, nombre, portada, precio, video) " +
                "VALUES (?, ?, ?, ?, ?, ?)";


        try (Connection con = DriverManager.getConnection(url, usuario, contrasena))
             {

        	PreparedStatement stmt = con.prepareStatement(sql); 

                stmt.setString(1, "Juega como un hombre o una mujer desnudo, congelándote y muriéndote de hambre en una isla misteriosa. Debes cazar, cosechar, crear objetos, cultivar, y construir refugios para sobrevivir. Usa tu habilidad y astucia para matar, domesticar, criar y cabalgar dinosaurios y otras criaturas primitivas.");
                stmt.setString(2, "/imagenes/arkGrande.png");
                stmt.setString(3, "Ark Survival Evolved");
                stmt.setString(4, "/imagenes/arkPequeno.png");
                stmt.setDouble(5, 1479);
                stmt.setString(6, "https://www.youtube.com/embed/FW9vsrPWujI&t");
                stmt.executeUpdate();

                stmt.setString(1, "Combate realista en un enorme mundo abierto militar. Gran cantidad de contenido en solitario y multijugador, más de 20 vehículos y 40 armas e infinitas posibilidades de creación de contenido. El mejor juego militar para PC. Auténtico, diverso, abierto... Con Arma 3 vas a vivir la guerra.");
                stmt.setString(2, "/imagenes/arma3Grande.png");
                stmt.setString(3, "Arma 3");
                stmt.setString(4, "/imagenes/arma3Pequeno.png");
                stmt.setDouble(5, 2799);
                stmt.setString(6, "https://www.youtube.com/embed/M1YBZUxMX8g");
                stmt.executeUpdate();
                
                stmt.setString(1, "Assetto Corsa v1.16 introduces the new \"Laguna Seca\" laser-scanned track, 7 new cars among which the eagerly awaited Alfa Romeo Giulia Quadrifoglio! Check the changelog for further info!");
                stmt.setString(2, "/imagenes/assetoGrande.png");
                stmt.setString(3, "Assetto Corsa");
                stmt.setString(4, "/imagenes/assetoPequeno.png");
                stmt.setDouble(5, 1999);
                stmt.setString(6, "https://www.youtube.com/embed/CYncAnd31Q8");
                stmt.executeUpdate();
                 
                stmt.setString(1, "BioShock es un shooter distinto a todos los que has jugado antes, lleno de armas y tácticas nunca vistas. Tendrás un completo arsenal a tu disposición: desde sencillos revólveres a lanzagranadas y lanzadores de productos químicos, pero también estarás obligado a modificar tu ADN para crear un arma.");
                stmt.setString(2, "/imagenes/bioshockGrande.png");
                stmt.setString(3, "Bioshock");
                stmt.setString(4, "/imagenes/bioshockPequeno.png");
                stmt.setDouble(5, 1999);
                stmt.setString(6, "https://www.youtube.com/embed/CoYorK3E4aM");
                stmt.executeUpdate();
                
                stmt.setString(1, "Superando las expectativas de los fans con respecto a esta franquicia que ha batido todos los récords, Call of Duty®: Black Ops 2 lleva a los jugadores a una futura Guerra Fría");
                stmt.setString(2, "/imagenes/blackOps2Grande.png");
                stmt.setString(3, "Call of Duty: Black Ops II");
                stmt.setString(4, "/imagenes/blackOps2Pequeno.png");
                stmt.setDouble(5, 5999);
                stmt.setString(6, "https://www.youtube.com/embed/x3tedlWs1XY");
                stmt.executeUpdate();
                
                stmt.setString(1, "Cyberpunk 2077 es un RPG de aventura y acción de mundo abierto ambientado en el futuro sombrío de Night City, una peligrosa megalópolis obsesionada con el poder, el glamur y las incesantes modificaciones corporales.");
                stmt.setString(2, "/imagenes/cyberpunkGrande.png");
                stmt.setString(3, "Cyberpunk 2077");
                stmt.setString(4, "/imagenes/cyberpunkPequeno.png");
                stmt.setDouble(5, 5999);
                stmt.setString(6, "https://www.youtube.com/embed/5c7rAU5UmWY");
                stmt.executeUpdate();
                
                stmt.setString(1, "Dark Souls continúa redefiniendo los límites con el nuevo y ambicioso capítulo de esta serie revolucionaria, tan aclamada por la crítica. ¡Prepárate para sumergirte en la oscuridad!");
                stmt.setString(2, "/imagenes/darkSoulsGrande.png");
                stmt.setString(3, "Dark Souls III");
                stmt.setString(4, "/imagenes/darkSoulsPequeno.png");
                stmt.setDouble(5, 3499);
                stmt.setString(6, "https://www.youtube.com/embed/_zDZYrIUgKE");
                stmt.executeUpdate();
                
                stmt.setString(1, "Dead by Daylight es un juego de horror de multijugador (4 contra 1) en el que un jugador representa el rol del asesino despiadado y los 4 restantes juegan como supervivientes que intentan escapar de él para evitar ser capturados y asesinados.");
                stmt.setString(2, "/imagenes/dbdGrande.png");
                stmt.setString(3, "Dead By Daylight");
                stmt.setString(4, "/imagenes/dbdPequeno.png");
                stmt.setDouble(5, 799);
                stmt.setString(6, "https://www.youtube.com/embed/JGhIXLO3ul8");
                stmt.executeUpdate();
                
                stmt.setString(1, "Vuelve el clásico de terror y supervivencia de ciencia ficción, recreado completamente para ofrecer una experiencia más inmersiva (incluidas mejoras visuales, sonoras y de jugabilidad) al mismo tiempo que se mantiene fiel a la emocionante visión del juego original.");
                stmt.setString(2, "/imagenes/deadSpaceGrande.png");
                stmt.setString(3, "Dead Space");
                stmt.setString(4, "/imagenes/deadSpacePequeno.png");
                stmt.setDouble(5, 1799);
                stmt.setString(6, "https://www.youtube.com/embed/mWrBqrifdvk");
                stmt.executeUpdate();
                
                stmt.setString(1, "Ahora incluye los tres paquetes de contenido descargable premium (Unto the Evil-Hell Followed-Bloodfall), mapas, modos y armas, así como todas las actualizaciones de funcionalidades, como el modo Arcade, el modo Foto y la actualización 6.66, la más reciente, que trae más mejoras multijugador.");
                stmt.setString(2, "/imagenes/doomGrande.png");
                stmt.setString(3, "Doom");
                stmt.setString(4, "/imagenes/doomPequeno.png");
                stmt.setDouble(5, 1999);
                stmt.setString(6, "https://www.youtube.com/embed/6SRj82vc1Jg");
                stmt.executeUpdate();
                
                stmt.setString(1, "EL NUEVO JUEGO DE ROL Y ACCIÓN DE AMBIENTACIÓN FANTÁSTICA. Álzate, Sinluz, y que la gracia te guíe para abrazar el poder del Círculo de Elden y encumbrarte como señor del Círculo en las Tierras Intermedias.");
                stmt.setString(2, "/imagenes/eldenRingGrande.png");
                stmt.setString(3, "Elden Ring");
                stmt.setString(4, "/imagenes/eldenRingPequeno.png");
                stmt.setDouble(5, 4499);
                stmt.setString(6, "https://www.youtube.com/embed/9SOnJrVPHJo");
                stmt.executeUpdate();
                
                stmt.setString(1, "Bienvenido a Las Vegas. New Vegas. ¡Disfruta de tu estancia!");
                stmt.setString(2, "/imagenes/falloutGrande.png");
                stmt.setString(3, "Fallout: New Vegas");
                stmt.setString(4, "/imagenes/falloutPequeno.png");
                stmt.setDouble(5, 999);
                stmt.setString(6, "https://www.youtube.com/embed/l-x-1fm2cq8");
                stmt.executeUpdate();
                
                stmt.setString(1, "EA SPORTS FC™ 25 te ofrece más formas de ganar por el club. Forma equipo con tus colegas en tus modos favoritos con el nuevo Rush de 5 contra 5 y lleva a tu club a la victoria gracias a un control táctico más realista que nunca con FC IQ.");
                stmt.setString(2, "/imagenes/fifaGrande.png");
                stmt.setString(3, "Fifa 2025");
                stmt.setString(4, "/imagenes/fifaPequeno.png");
                stmt.setDouble(5, 4999);
                stmt.setString(6, "https://www.youtube.com/embed/pBM2xyco_Kg");
                stmt.executeUpdate();
                
                stmt.setString(1, "Explora los coloridos paisajes del mundo abierto de México con una acción de conducción ilimitada y divertida en los mejores coches del mundo.");
                stmt.setString(2, "/imagenes/forza5Grande.png");
                stmt.setString(3, "Forza Horizon 5");
                stmt.setString(4, "/imagenes/forza5Pequeno.png");
                stmt.setDouble(5, 5999);
                stmt.setString(6, "https://www.youtube.com/embed/FYH9n37B7Yw");
                stmt.executeUpdate();
                
                stmt.setString(1, "Kratos y Atreus se embarcan en una mítica aventura en busca de respuestas y aliados antes de la llegada del Ragnarök. Ahora también en PC.");
                stmt.setString(2, "/imagenes/godOfWarGrande.png");
                stmt.setString(3, "God of War: Ragnarok");
                stmt.setString(4, "/imagenes/godOfWarPequeno.png");
                stmt.setDouble(5, 5999);
                stmt.setString(6, "https://www.youtube.com/embed/vtFhDrMIZjE");
                stmt.executeUpdate();
                
                stmt.setString(1, "Disfruta de los superventas del entretenimiento Grand Theft Auto V y Grand Theft Auto Online, ahora mejorados para una nueva generación, con impresionantes gráficos, carga más rápida, audio 3D y mucho más, además de contenido exclusivo para los jugadores de GTA Online.");
                stmt.setString(2, "/imagenes/gtaGrande.png");
                stmt.setString(3, "Grand Theft Auto V");
                stmt.setString(4, "/imagenes/gtaPequeno.png");
                stmt.setDouble(5, 2999);
                stmt.setString(6, "https://www.youtube.com/embed/QkkoHAzjnUs");
                stmt.executeUpdate();
                
                stmt.setString(1, "La última línea de ataque de la galaxia. Alístate en los Helldivers y únete a la lucha por la libertad en una galaxia hostil en un juego de disparos en tercera persona rápido, frenético y feroz.");
                stmt.setString(2, "/imagenes/helldiverGrande.png");
                stmt.setString(3, "Helldivers 2");
                stmt.setString(4, "/imagenes/helldiverPequeno.png");
                stmt.setDouble(5, 3999);
                stmt.setString(6, "https://www.youtube.com/embed/-Lc2sLpWD3E");
                stmt.executeUpdate();
                
                stmt.setString(1, "Un emocionante RPG de acción con mucha narrativa y un exuberante mundo abierto situado en la Europa medieval del siglo XV. No te pierdas la aventura medieval definitiva donde vivirás un viaje de proporciones épicas de la mano del joven Henry.");
                stmt.setString(2, "/imagenes/kingdomComeGrande.png");
                stmt.setString(3, "Kingdom Come: Deliverance II");
                stmt.setString(4, "/imagenes/kingdomComePequeno.png");
                stmt.setDouble(5, 5999);
                stmt.setString(6, "https://www.youtube.com/embed/ju8R8gwD-Vg");
                stmt.executeUpdate();
                
                stmt.setString(1, "¡Únete a la persecución! En LEGO® CITY Undercover te convertirás en Chase McCain, un agente de policía de incógnito que perseguirá al malvado criminal Rex Fury —que se acaba de fugar— y pondrás fin a su ola de delitos en la ciudad.");
                stmt.setString(2, "/imagenes/legoUndercoverGrande.png");
                stmt.setString(3, "LEGO CITY Undercover");
                stmt.setString(4, "/imagenes/legoUndercoverPequeno.png");
                stmt.setDouble(5, 2999);
                stmt.setString(6, "https://www.youtube.com/embed/WpFR2sOFQcw");
                stmt.executeUpdate();
                
                stmt.setString(1, "Minecraft es un juego de computadora en 3D donde los jugadores pueden construir cualquier cosa . El juego, descrito como un \"Lego en línea\", consiste en construir bloques y crear estructuras en diferentes entornos y terrenos. Ambientado en un mundo virtual, el juego implica recolectar recursos, fabricar objetos, construir y combatir.");
                stmt.setString(2, "/imagenes/minecraftGrande.png");
                stmt.setString(3, "Minecraft");
                stmt.setString(4, "/imagenes/minecraftPequeno.png");
                stmt.setDouble(5, 1789);
                stmt.setString(6, "https://www.youtube.com/embed/1DhWXAiNgfQ");
                stmt.executeUpdate();
                
                stmt.setString(1, "Hell is an experiment you can't survive in Outlast, a first-person survival horror game developed by veterans of some of the biggest game franchises in history. As investigative journalist Miles Upshur, explore Mount Massive Asylum and try to survive long enough to discover its terrible secret...");
                stmt.setString(2, "/imagenes/outlastGrande.png");
                stmt.setString(3, "Outlast");
                stmt.setString(4, "/imagenes/outlastPequeno.png");
                stmt.setDouble(5, 1950);
                stmt.setString(6, "https://www.youtube.com/embed/uKA-IA4locM");
                stmt.executeUpdate();
                
                stmt.setString(1, "PAYDAY 2 es un juego de acción cooperativo para cuatro jugadores que, una vez más, permite a los jugadores ponerse en la piel del equipo original de PAYDAY - Dallas, Hoxton, Wolf y Chains - mientras descienden por Washington DC en una épica ola de crímenes.");
                stmt.setString(2, "/imagenes/payday2Grande.png");
                stmt.setString(3, "Pay Day 2");
                stmt.setString(4, "/imagenes/payday2Pequeno.png");
                stmt.setDouble(5, 999);
                stmt.setString(6, "https://www.youtube.com/embed/e8CMPB03-pw");
                stmt.executeUpdate();
                
                stmt.setString(1, "Tom Clancy's Rainbow Six® Siege es un shooter táctico realista por equipos donde una cuidadosa planificación y ejecución son claves para la victoria.");
                stmt.setString(2, "/imagenes/r6Grande.png");
                stmt.setString(3, "Tom Clancy's Rainbow Six Siege");
                stmt.setString(4, "/imagenes/r6Pequeno.png");
                stmt.setDouble(5, 1999);
                stmt.setString(6, "https://www.youtube.com/embed/mj99yIzCQpc");
                stmt.executeUpdate();
                
                stmt.setString(1, "The only aim in Rust is to survive. Everything wants you to die - the island’s wildlife, other inhabitants, the environment, and other survivors. Do whatever it takes to last another night.");
                stmt.setString(2, "/imagenes/rustGrande.png");
                stmt.setString(3, "Rust");
                stmt.setString(4, "/imagenes/rustPequeno.png");
                stmt.setDouble(5, 3999);
                stmt.setString(6, "https://www.youtube.com/embed/LGcECozNXEw");
                stmt.executeUpdate();
                
                stmt.setString(1, "Sea of Thieves es un exitoso juego de aventuras piratas que ofrece la experiencia pirata por excelencia de saquear tesoros perdidos, batallas intensas, vencer monstruos marinos y más. Sumérgete en esta edición revisada del juego, que incluye acceso a medios digitales de bonificación.");
                stmt.setString(2, "/imagenes/seaofThievesGrande.png");
                stmt.setString(3, "Sea Of Thieves");
                stmt.setString(4, "/imagenes/seaofThievesPequeno.png");
                stmt.setDouble(5, 3999);
                stmt.setString(6, "https://www.youtube.com/embed/r5JIBaasuE8");
                stmt.executeUpdate();
                
                stmt.setString(1, "The Elder Scrolls V: Skyrim Special Edition, ganador de más de 200 premios al “Juego del año”, da vida a la fantasía épica con un nivel de detalle asombroso. La Special Edition incluye el juego aclamado por la crítica y complementos con nuevas funcionalidades.");
                stmt.setString(2, "/imagenes/skyrimGrande.png");
                stmt.setString(3, "The Elder Scrolls V: Skyrim");
                stmt.setString(4, "/imagenes/skyrimPequeno.png");
                stmt.setDouble(5, 2299);
                stmt.setString(6, "https://www.youtube.com/embed/JSRtYpNRoN0");
                stmt.executeUpdate();
                
                stmt.setString(1, "Los grandes héroes se forjan juntos. El increíble poder del simbionte lleva a Peter Parker y Miles Morales a una lucha desesperada mientras intentan equilibrar sus vidas, sus amistades y su deber de proteger a los demás en un emocionante capítulo de la aclamada franquicia Spider-Man en PC.");
                stmt.setString(2, "/imagenes/spidermanGrande.png");
                stmt.setString(3, "Marvel's Spider-Man 2");
                stmt.setString(4, "/imagenes/spidermanPequeno.png");
                stmt.setDouble(5, 5299);
                stmt.setString(6, "https://www.youtube.com/embed/rCIV0y8jNy4");
                stmt.executeUpdate();
                
                stmt.setString(1, "Desciende a las profundidades de un mundo submarino alienígena lleno de belleza y peligros. Crea equipamiento, pilota submarinos, terraforma el terreno, y burla los peligros para explorar exhuberantes arrecifes de coral, volcanes, sistemas de cuevas y más - Todo mientras intentas sobrevivir.");
                stmt.setString(2, "/imagenes/subnauticaGrande.png");
                stmt.setString(3, "Subnautica");
                stmt.setString(4, "/imagenes/subnauticaPequeno.png");
                stmt.setDouble(5, 2299);
                stmt.setString(6, "https://www.youtube.com/embed/Rz2SNm8VguE");
                stmt.executeUpdate();
                
                stmt.setString(1, "¡Cava, lucha, explora, construye! Con este juego de aventuras repleto de acción nada es imposible. ¡Pack de Cuatro también disponible!");
                stmt.setString(2, "/imagenes/terrariaGrande.png");
                stmt.setString(3, "Terraria");
                stmt.setString(4, "/imagenes/terrariaPequeno.png");
                stmt.setDouble(5, 975);
                stmt.setString(6, "https://www.youtube.com/embed/6nUvWkD8rAE");
                stmt.executeUpdate();
                
                stmt.setString(1, "ULTRAKILL is a fast-paced ultraviolent retro FPS combining the skill-based style scoring from character action games with unadulterated carnage inspired by the best shooters of the '90s. Rip apart your foes with varied destructive weapons and shower in their blood to regain your health.");
                stmt.setString(2, "/imagenes/ultrakillGrande.png");
                stmt.setString(3, "UltraKill");
                stmt.setString(4, "/imagenes/ultrakillPequeno.png");
                stmt.setDouble(5, 2399);
                stmt.setString(6, "https://www.youtube.com/embed/Pw63IVgYLDc");
                stmt.executeUpdate();
                
                stmt.close();
        	     
                 
        } catch (Exception e) {
            System.err.println("Algo ha salido mal en la creacion de la base de datos: "+e.getMessage());
        }
    }
}
