import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdArrowForwardIos } from "react-icons/md";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { flexCenter } from "../styles/mixins";
import { login } from "../actions/session.action";

const LandingPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    dispatch(login({ username: "jane_doe", password: "jane_doe" }));
    setIsLoading(false);
  };

  return (
    <Container>
      <NavBar>
        <Logo>
          <Link to="/">
            <FaPen />
            Easynote
          </Link>
        </Logo>
        <NavLinkList>
          <NavLinkItem>
            <Link to="/signup">Sign up</Link>
          </NavLinkItem>
          <NavLinkItem>
            <Link to="/login">Login</Link>
          </NavLinkItem>
        </NavLinkList>
      </NavBar>
      <Content>
        <Heading>Make Note-taking Easy</Heading>
        <Subheading>Feel organized without the effort</Subheading>
        <ActionButton onClick={handleLogin} disabled={isLoading}>
          <ActionButtonContainer>
            <span>Try it now</span>
            <MdArrowForwardIos />
          </ActionButtonContainer>
        </ActionButton>
        <ActionText>(No login required)</ActionText>
        <HeroImages>
          <img
            src="macbook_mockup.png"
            alt="screenshot"
            className="macbook-mockup"
          />
        </HeroImages>
      </Content>
      <Footer>
        <FooterColumn>
          <FooterHeading>About</FooterHeading>
          <FooterList>
            <FooterListItem>King-Yiu Suen</FooterListItem>
          </FooterList>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>Contact</FooterHeading>
          <FooterList>
            <FooterListItem>
              <a href="mailto:kingyiusuen@gmail.com">Email</a>
            </FooterListItem>
            <FooterListItem>
              <a href="https://linkedin.com/in/kingyiusuen">Linkedin</a>
            </FooterListItem>
            <FooterListItem>
              <a href="https://github.com/kingyiusuen">GitHub</a>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
        <FooterColumn>
          <FooterHeading>More Projects</FooterHeading>
          <FooterList>
            <FooterListItem>
              <a href="https://github.com/kingyiusuen/discord-clone">
                Discord Clone
              </a>
            </FooterListItem>
            <FooterListItem>
              <a href="https://github.com/kingyiusuen/pinterest-clone">
                Pinterest Clone
              </a>
            </FooterListItem>
          </FooterList>
        </FooterColumn>
      </Footer>
    </Container>
  );
};

export default LandingPage;

const Container = styled.div`
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
  overflow-x: hidden;
`;

const HeroImages = styled.div`
  & > img {
    width: 900px;
    max-width: 100%;
  }
`;

const NavBar = styled.nav`
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled.div`
  font-size: 24px;
  user-select: none;
  color: var(--brand);

  & > a {
    display: flex;
    gap: 12px;
  }
`;

const NavLinkList = styled.ul`
  display: flex;
  gap: 20px;
  list-style: none;
`;

const NavLinkItem = styled.li`
  & > a:hover {
    color: #7380a7;
  }
`;

const Content = styled.main`
  padding: 60px 0;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 48px;
  line-height: 1.5;

  @media only screen and (min-width: 810px) {
    font-size: 64px;
  }
`;

const Subheading = styled.h2`
  font-size: 30px;
  font-weight: 400;
  padding: 10px 0 40px 0;
`;

const ActionButton = styled.button`
  font-size: 18px;
  padding: 14px 24px;
  box-sizing: border-box;
  border-radius: 4px;
  color: white;
  background-color: ${({ disabled }) =>
    disabled ? "#6d7a9d" : "var(--brand)"};
  border: 1px solid ${({ disabled }) => (disabled ? "#6d7a9d" : "var(--brand)")};

  &:hover {
    background-color: ${({ disabled }) => (disabled ? "#6d7a9d" : "#282c39")};
    cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  }
`;

const ActionButtonContainer = styled.div`
  ${flexCenter}
  gap: 8px;
`;

const ActionText = styled.p`
  font-size: 16px;
  margin: 14px 0 40px 0;
`;

const Footer = styled.footer`
  padding: 40px 0 24px 0;
  margin: 0 auto;
  text-align: center;
  border-top: 1px solid var(--brand);

  & a:hover {
    color: #7380a7;
  }

  @media only screen and (min-width: 480px) {
    display: flex;
    justify-content: space-evenly;
    text-align: left;
  }
`;

const FooterColumn = styled.div`
  padding-bottom: 24px;
`;

const FooterHeading = styled.h3`
  text-transform: uppercase;
`;

const FooterList = styled.ul`
  list-style: none;
`;

const FooterListItem = styled.li`
  margin: 16px 0;

  @media only screen and (min-width: 480px) {
    margin: 24px 0;
  }
`;
