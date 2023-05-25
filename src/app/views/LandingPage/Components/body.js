import styled from "styled-components";

const Container = styled.div`
    align-items: center;
    padding: 0px 15px 100px;
    text-align: justify;
    margin: 0px auto;
    max-width: 1200px;
    font-family: Montserrat, sans-serif;

	@media (min-width: 1200px)
    .container {
    width: 1170px;
	
	@media (min-width: 992px)
.container {
    width: 97%;
}
@media (min-width: 768px)
.container {
    width: 95%;
}
@media (min-width: 480px)
.container {
    width: 95%;
}
`;
const Heading = styled.h2`
    font-size: 35px;
    text-align: center;
    font-weight: 700;
    margin-bottom: 50px;
    color: #333;
`;
const PStyle = styled.p`
    display: block;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-size: 17px;
    margin-bottom: 30px;
    color: rgb(119, 119, 119);
    font-family: Montserrat, sans-serif;
`;

function Body() {
    return (
        <Container>
            <Heading>Clubs et organisations étudiantes</Heading>
            <PStyle  style={{ fontFamily: 'Montserrat, sans-serif' }}>Les Clubs et organisations étudiantes de l’UIR ont pour vocation de mener des actions étudiantes sur différents fronts : manifestations artistiques et culturelles, actions humanitaires, activités environnementales et volontariat.</PStyle>
            <PStyle>L’Université Internationale de Rabat a la fierté de compter 29 clubs étudiants affiliés à la Direction de la Vie Etudiante et qui contribuent à promouvoir l’expérience étudiante en participant à l’animation de leur campus et par conséquent, au rayonnement et au développement de leur communauté.</PStyle>
            <PStyle>Si vous avez un projet de Club qui ne figure pas sur la liste ci-dessous, vous pouvez effectuer une demande de création de Club auprès de Mr Rachid HADRE en envoyant un mail à : <a href="#" style={{ color: '#333333',fontSize: '17px',cursor: 'pointer',fontWeight: 'bold',textDecoration: 'underline' }}>rachid.hadre@uir.ac.ma</a></PStyle>
        </Container>
    );
};

export default Body;
