import React from 'react';
import { Button, Typography, Row, Col, Card } from 'antd';
import Link from 'next/link';

const HomeComponent = () => {
  return (
    <div className="home-page">
      <div className="hero-section">
        <Typography.Title level={1}>Welcome to GenquiX</Typography.Title>
        <Typography.Title level={2}>Discover the Future of Quizzing</Typography.Title>
        <p>At GenquiX, we are revolutionizing the way quizzes are created, delivered, and experienced. Whether you're an educator, a business professional, or a trivia enthusiast, GenquiX offers a cutting-edge platform to craft engaging and insightful quizzes with ease.</p>
      </div>
      <div className="what-is-genquix">
        <Typography.Title level={3}>What is GenquiX?</Typography.Title>
        <p>GenquiX is an AI-powered quiz generation platform designed to help you create high-quality quizzes in minutes. Our state-of-the-art technology leverages advanced algorithms to generate questions tailored to your specific needs, ensuring that each quiz is both challenging and educational.</p>
      </div>
      <div className="key-features">
        <Typography.Title level={3}>Key Features</Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="AI-Generated Questions" bordered={false}>
              <p>With our AI engine, you can generate a wide variety of questions, from multiple-choice to open-ended formats. Simply input your topic, and let GenquiX do the rest!</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Customizable Templates" bordered={false}>
              <p>Choose from a range of beautifully designed templates to suit your style. Customize fonts, colors, and layouts to make your quizzes visually appealing.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Advanced Analytics" bordered={false}>
              <p>Track performance and gain insights with our comprehensive analytics dashboard. Understand your audience's strengths and areas for improvement with detailed reports.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Easy Integration" bordered={false}>
              <p>Integrate GenquiX seamlessly with your existing systems. Whether you're using a learning management system, a website, or a corporate intranet, our API makes it simple to embed quizzes anywhere.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Secure & Reliable" bordered={false}>
              <p>Security is our top priority. GenquiX ensures that your data is safe with industry-standard encryption and secure cloud hosting.</p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="why-choose-genquix">
        <Typography.Title level={3}>Why Choose GenquiX?</Typography.Title>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Efficient" bordered={false}>
              <p>Save time with automated quiz generation.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Engaging" bordered={false}>
              <p>Create interactive quizzes that captivate your audience.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Versatile" bordered={false}>
              <p>Suitable for education, training, marketing, and entertainment.</p>
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Supportive" bordered={false}>
              <p>Access our dedicated support team for assistance whenever you need it.</p>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="get-started">
        <Typography.Title level={3}>Get Started Today!</Typography.Title>
        <p>Ready to transform the way you quiz? Join GenquiX today and experience the future of quizzing. Whether you're looking to educate, entertain, or evaluate, GenquiX has you covered.</p>
        <Link href="/dashboard">
          <Button type="primary" size="large">Dashboard</Button>
        </Link>
      </div>
      <div className="contact-us">
        <Typography.Title level={3}>Contact Us</Typography.Title>
        <p>Have questions? Want to learn more? Contact our team at <a href="mailto:info@genquix.com">info@genquix.com</a>.</p>
      </div>
    </div>
  );
};

export default HomeComponent;
