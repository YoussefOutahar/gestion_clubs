import styled from 'styled-components';

export const Box = styled.div`
padding: 80px 60px;
background: #003667;
position: flex;
bottom: 0;
width: 100%;

@media (max-width: 1000px) {
	padding: 70px 30px;
}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	max-width: 1200px;
	margin: 0 auto;
	padding-left: 15px;
    padding-right: 15px;
	/*background: red; */

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
}
`

export const Column = styled.div`
display: flex;
flex-direction: column;
text-align: left;
margin-left: 60px;
`;

export const Row = styled.div`
display: grid;
grid-template-columns: repeat(4, 275px);
grid-gap: 20px;

@media (max-width: 1000px) {
	grid-template-columns: repeat(4, 200px);
}
`;

export const FooterLink = styled.a`
color: #fff;
margin-bottom: 10px;
font-size: 14px !important;
text-decoration: none;
display: inline-block;
line-height: 1.2;
font-family: Montserrat, Helvetica, sans-serif;

&:hover {
	margin-left: 15px;
    color: #d0d700;
}
`;

export const Heading = styled.p`
font-size: 24px;
color: #fff;
margin-bottom: 40px;
font-weight: 500;
font-family: Montserrat, Helvetica, sans-serif;
`;
export const FooterBar = styled.div`
margin-top: 60px;
background: #01305a;
padding: 15px;
`;

export const Footernav = styled.a`
color: #fff;
margin-bottom: 10px;
font-size: 14px;
text-decoration: none;
font-family: Montserrat, Helvetica, sans-serif;
display: inline-block;

&:hover {
	color: #d0d700;
	transition: 200ms ease-in;
	text-decoration: underline ;
}
`;
