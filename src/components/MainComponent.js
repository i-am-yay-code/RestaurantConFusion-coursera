import React, { Component } from 'react';
import Menu from './menuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { useSelector } from 'react-redux'




export const Main = () => {

    const dishes = useSelector(state => state.fullData.dishes)
    const comments = useSelector(state => state.fullData.comments)
    const promotions = useSelector(state => state.fullData.promotions)
    const leaders = useSelector(state => state.fullData.leaders)


    const HomePage = () => {
        return (
            <Home
                dish={dishes.filter((dish) => dish.featured)[0]}
                promotion={promotions.filter((promo) => promo.featured)[0]}
                leader={leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    const DishWithId = ({ match }) => {
        return (
            <DishDetail dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))} />
        );
    };

    return (
        <div>
            <Header />
            <div>
                <Switch>
                    <Route path='/home' component={HomePage} />
                    <Route exact path='/aboutus' component={() => <About leaders={leaders} />} />
                    <Route exact path='/menu' component={() => <Menu dishes={dishes} />} />
                    <Route path='/menu/:dishId' component={DishWithId} />
                    <Route exact path='/contactus' component={Contact} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}


export default Main;


