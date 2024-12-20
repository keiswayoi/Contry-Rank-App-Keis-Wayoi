import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNews, resetError } from "../redux/slice";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "bootstrap/dist/css/bootstrap.min.css";

function NewsPage() {
  const dispatch = useDispatch();

  const { articles, error, isLoading } = useSelector((state) => ({
    articles: state.globalData.news,
    error: state.globalData.error.news,
    isLoading: state.globalData.isLoading.news,
  }));

  useEffect(() => {
    dispatch(fetchNews());
    return () => {
      dispatch(resetError());
    };
  }, [dispatch]);

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">News and Articles</h1>
      {error && <p className="text-danger text-center">{error}</p>}

      {isLoading ? (
        <p className="text-center">Loading articles...</p>
      ) : (
        <Row xs={1} md={3} className="g-4">
          {articles.map((article, index) => {
            const imageUrl = article.imageUrl || "placeholder.jpg"; // Fallback image jika tidak ada gambar

            return (
              <Col key={index}>
                <Card className="h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={imageUrl}
                    alt={article.title || "Article Image"}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <Card.Body>
                    <Card.Title
                      className="fw-bold"
                      style={{ fontSize: "1.1rem" }}
                    >
                      {article.title || "No Title"}
                    </Card.Title>
                    <Card.Text
                      className="text-muted"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {article.description || "No description available."}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-sm"
                    >
                      Read More
                    </a>
                  </Card.Footer>
                </Card>
              </Col>
            );
          })}
        </Row>
      )}
    </Container>
  );
}

export default NewsPage;
