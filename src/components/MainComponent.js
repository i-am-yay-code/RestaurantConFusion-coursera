import React, { Component } from 'react';
import Menu from './menuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import About from './AboutComponent';
import { Switch, Route, Redirect } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react';
import { actions } from 'react-redux-form'
import { addComment, fetchDishes, fetchComments, fetchPromos } from '../redux/ActionCreators';
import { Loading } from './LoadingComponent';




export const Main = () => {

    const [loaded, setLoaded] = useState(false)

    const dishes = useSelector(state => state.dishes)
    const comments = useSelector(state => state.comments)
    const promotions = useSelector(state => state.promotions)
    const leaders = useSelector(state => state.leaders)


    const dispatch = useDispatch();

    const resetFeedbackForm = () => dispatch(actions.reset('feedback'))

    const AddCommentClicked = (dishId, rating, author, comment) => {
        dispatch(addComment(dishId, rating, author, comment));
    }

    const fetchDishesEffect = () => { dispatch(fetchDishes()) }
    const fetchPromosEffect = () => { dispatch(fetchPromos()) }
    const fetchCommentsEffect = () => { dispatch(fetchComments()) }


    useEffect(() => {
        if (loaded) {
            return;
        }
        fetchDishesEffect();
        fetchCommentsEffect();
        fetchPromosEffect();
        setLoaded(true);

    }, [loaded]);



    const HomePage = () => {

        if (dishes.isLoading || promotions.isLoading) {
            return (<Loading />)
        }
        else {
            return (
                <Home
                    dish={dishes.dishes.filter((dish) => dish.featured)[0]}
                    dishesLoading={dishes.isLoading}
                    dishesErrMess={dishes.errMess}
                    promotion={promotions.promotions.filter((promo) => promo.featured)[0]}
                    promoLoading={promotions.isLoading}
                    promoErrMess={promotions.errMess}
                    leader={leaders.filter((leader) => leader.featured)[0]}
                />
            );
        }
    }

    const DishWithId = ({ match }) => {
        if (dishes.isLoading) {
            return (<Loading />)
        }
        else {
            return (
                <DishDetail
                    dish={dishes.filter((dish) => dish.id === parseInt(match.params.dishId, 10))[0]}
                    isLoading={!loaded}
                    errMess={dishes.errMess}
                    comments={comments.filter((comment) => comment.dishId === parseInt(match.params.dishId, 10))}
                    commentsErrMess={comments.errMess}
                    addComment={AddCommentClicked} />
            );
        }
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
                    <Route exact path='/contactus' component={() => <Contact resetFeedbackForm={resetFeedbackForm} />} />
                    <Redirect to="/home" />
                </Switch>
            </div>
            <Footer />
        </div>
    );
}


export default Main;


