import { Card, CardBody, CardTitle, CardText, CardImg, Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import { Component } from "react";
import CommentForm from "./CommentForm";




class DishDetail extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const RenderComments = ({ comments }) => {
            if (comments != null) {
                const commentList = [];
                comments.forEach(comment => {
                    commentList.push(
                        <li className="mb-2">{comment.comment}<br />
                            --- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.date)))}

                        </li>
                    );
                });

                return (
                    <div>
                        <h4 className="mb-3">Comments</h4>
                        <ul className="list-unstyled">
                            {commentList}
                        </ul>
                        <CommentForm />
                    </div>
                );
            }
            else {
                return (
                    <div></div>
                );
            }
        }

        const RenderDish = ({ dish }) => {
            if (dish != null)
                return (
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                );
            else
                return (
                    <div></div>
                );
        }







        return (

            <div className="container" >
                <div className="row">
                    <Breadcrumb>

                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{this.props.dish.name}</BreadcrumbItem>

                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{this.props.dish.name}</h3>
                        <hr />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={this.props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={this.props.comments} />
                    </div>
                </div>
            </div>
        );
    }
}




export default DishDetail;

