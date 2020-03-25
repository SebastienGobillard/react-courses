import styled from 'styled-components';

export const StyledMenu = styled.nav`
.global {
  display: none;
  flex-direction: column;
  display: inline;
  justify-content: space-between;
  background: ${({ theme }) => theme.primaryLight};
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  height: 100vh;
  width: 70%;
 
  padding: 1.5rem 2rem 1.5rem 2rem;
  box-shadow: 1px 1px 4px #DCDCDC;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.5s ease-in-out;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    display: flex;
      width: 70%;
    }
  }
  .div-logo {
    border-bottom: 1px solid #E4E4E4;
  }
  span {
    justify-content: space-between;
  }
  .logo {
    margin-bottom: 4rem;
  }
  .fleche {
    width: .4rem;
    height: .9rem;
    justify-content: space-between;
    display:flex;
 
  }
  .bord {
    border-bottom: 1px solid #E4E4E4;
    display: block;
    justify-content: space-between;
    justify-content: left;
    justify-items: center;
  }
  .text {
    display: flex;
    justify-content: space-between;
  }

  .txt {
    display: flex;
    justify-content: space-between;
    margin-top: 1rem;
  }

  #space {
    margin-top 0.5rem;
  }

  }
  
  .space {
height: 17rem;
  }
  a {
    font-family: 'Open Sans', sans-serif;
    display: flex;
    display: inline;
    justify-content: space-between;
    font-size: 1rem;
    padding-bottom: 1rem;
    color: ${({ theme }) => theme.primaryText};
    text-decoration: none;
    
    transition: color 0.3s linear;

    @media (max-width: ${({ theme }) => theme.mobile}) {
      @import url('https://fonts.googleapis.com/css?family=Open+Sans:400i,700i&display=swap');
      display: block;
    justify-content: space-between;
      font-size: 1rem;
      font-style: italic;
    }

    #dist {
      padding-top: 1rem;
    }
  
    &:hover {
      color: ${({ theme }) => theme.primaryHover};
    }
  }
`;
