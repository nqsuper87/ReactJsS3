import React, { useState, useEffect } from "react";

import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container"; // Make sure to import Container
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css"

// Inside your component
import config from "../config";

import UserService from "../services/user.service";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    UserService.getPublicContent().then(
      async (response) => {
        console.log("getPublicContent");
        console.log(response);
        const data = await response.data;
        setProducts(data);
      },
      (error) => {
        // const _content =
        //   (error.response && error.response.data) ||
        //   error.message ||
        //   error.toString();

        //setContent(_content);
      }
    );
  }, []);


  // Function to format the date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <Container>
    <Row>
      {products.map((product) => (
        <Col key={product.product_id} md={4}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={config.s3Url+ "products/" +product.image} alt={product.name} />
            <Card.Body>
              <Card.Title>{product.name}</Card.Title>
              <Card.Text>
                <strong>Price:</strong> ${product.price.toFixed(2)}
              </Card.Text>
              <Card.Text>
                <strong>Available:</strong>{" "}
                {product.available ? "Yes" : "No"}
              </Card.Text>
              <Card.Text>
                <strong>Created Date:</strong> {formatDate(product.createDate)}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
  );
};

export default Home;
