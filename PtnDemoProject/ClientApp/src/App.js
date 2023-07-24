import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import { Container } from 'reactstrap';
import './custom.css';

export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Container>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Container>
    );
  }
}
