import { Box, Container,FootContainer, Row, Column, FooterLink, Heading, FooterBar, Footernav } from "../../../../old_project/Resources/FooterStyle";

function Footer() {
    
    return (
        <Box>
      <Container>
        <Row>
          <Column>
            <img src="https://www.uir.ac.ma/assets/_resources/img/logo-10ans.png" alt="UIR Logo" style={{width :`250px`,marginBottom:`30px`}}></img>
            <FooterLink href="#">Université Internationale de Rabat Technopolis Rabat-Shore Rocade Rabat-Salé</FooterLink>
            <FooterLink href="#">+212 (0)530103000</FooterLink>
            <FooterLink href="#">contact@uir.ac.ma</FooterLink>
          </Column>
          <Column>
            <Heading>Notre institution</Heading>
            <FooterLink href="#">Mot du Président</FooterLink>
            <FooterLink href="#">IUn modèle innovant</FooterLink>
            <FooterLink href="#">Vision, mission et valeurs</FooterLink>
            <FooterLink href="#">Engagements</FooterLink>
            <FooterLink href="#">Reconnaissance</FooterLink>
            <FooterLink href="#">Distinctions</FooterLink>
            <FooterLink href="#">Partenaires</FooterLink>
          </Column>
          <Column>
            <Heading>Vie dans le campus</Heading>
            <FooterLink href="https://www.uir.ac.ma/fr/page/offre-residentielle">UOffre résidentielle</FooterLink>
            <FooterLink href="https://www.uir.ac.ma/fr/page/restauration-1">Restauration</FooterLink>
            <FooterLink href="https://www.uir.ac.ma/fr/page/transports">Transports</FooterLink>
            <FooterLink href="https://www.uir.ac.ma/fr/page/autres-services">Autres Services</FooterLink>
            <FooterLink href="https://www.uir.ac.ma/fr/page/sante-et-bien-etre">santé et Bien-étre</FooterLink>
            <FooterLink href="https://www.uir.ac.ma/fr/page/bibliotheque">Bibliothèque</FooterLink>
          </Column>
          <Column>
            <Heading>Liens utiles</Heading>
            <FooterLink href="#">
              <i className="fab fa-facebook-f">
                <span style={{ marginLeft: "10px" }}>
                  Candidats
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-instagram">
                <span style={{ marginLeft: "10px" }}>
                  Etudiants
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Parents
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-youtube">
                <span style={{ marginLeft: "10px" }}>
                  Alumni
                </span>
              </i>
            </FooterLink>
            <FooterLink href="#">
              <i className="fab fa-twitter">
                <span style={{ marginLeft: "10px" }}>
                  Entreprises
                </span>
              </i>
            </FooterLink>
          </Column>
        </Row>
      </Container>
      <FooterBar>
      <FootContainer >
          <p style={{ color: "#a3b5ca",fontSize: "14px" }}>© Copyright 2023 <span>UIR</span>. Tous droits réservés.</p>
          <Footernav href="#">Conditions générales d'utilisation</Footernav>
          <Footernav href="#">Mentions légales</Footernav>
          <Footernav href="#">Plan du site</Footernav>
          <Footernav href="#">FAQ</Footernav>
      </FootContainer>
      </FooterBar>
    </Box>
    );
}

export default Footer;
