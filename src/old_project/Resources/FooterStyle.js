import styled from 'styled-components';

export const Box = styled.div`
padding: 80px 0px;
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
	padding: 0px 15px;
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
padding: 0px 15px;
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
font-size: 14px ;
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
font-size: 28px;
color: #fff;
margin-bottom: 20px;
font-weight: bold;
font-family: Montserrat, sans-serif;
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
text-align: right;
padding: 0px 20px;

&:hover {
	color: #d0d700;
	transition: 200ms ease-in;
	text-decoration: underline ;
}
`;

export const FootContainer = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	max-width: 1200px;
	margin: 0 auto;
	padding: 0px 15px;
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