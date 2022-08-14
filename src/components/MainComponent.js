import React, { Component } from 'react';
import Menu from './menuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addComment, fetchDishes } from '../redux/ActionCreators';
import { useEffect } from 'react';




export const Main = () => {

    const dishes = useSelector(state => state.dishes)
    const comments = useSelector(state => state.comments)
    const promotions = useSelector(state => state.promotions)
    const leaders = useSelector(state => state.leaders)

    const dispatch = useDispatch();

    const AddCommentClicked = (dishId, rating, author, comment) => {
        dispatch(addComment(dishId, rating, author, comment));
    }


    const HomePage1 = () => {
        return (
            <Home
                dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={this.props.dishes.isLoading}
                dishesErrMess={this.props.dishes.errMess}
                promotion={this.props.promotions.filter((promo) => promo.featured)[0]}
                leader={this.props.leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    const DishWithId2 = ({ match }) => {
        return (
            <DishDetail dish={this.props.dishes.dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                isLoading={this.props.dishes.isLoading}
                errMess={this.props.dishes.errMess}
                comments={this.props.comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                addComment={this.props.addComment}
            />
        );
    };

    const HomePage = () => {
        return (
            <Home
                dish={dishes.filter((dish) => dish.featured)[0]}
                dishesLoading={dishes.isLoading}
                dishesErrMess={dishes.errMess}
                promotion={promotions.filter((promo) => promo.featured)[0]}
                leader={leaders.filter((leader) => leader.featured)[0]}
            />
        );
    }

    const DishWithId = ({ match }) => {
        return (
            <DishDetail
                dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                isLoading={dishes.isLoading}
                errMess={dishes.errMess}
                comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                addComment={AddCommentClicked} />
        );
    };


    useEffect(() => {
        dispatch(fetchDishes());
        console.log("RENDER")
    });


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


